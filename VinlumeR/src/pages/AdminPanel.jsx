import { useState } from 'react';
import { localApi, buscarEnApiExterna } from '../utils/api';
import '../styles/login.css'; // Reutilizamos estilos del form

export default function AdminPanel() {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [formulario, setFormulario] = useState({ titulo: '', artista: '', precio: 4990, stock: 10, imagen: '', tags: [] });
  const [feedback, setFeedback] = useState({ visible: false, texto: '', tipo: '' });

  const mostrarFeedback = (texto, tipo) => {
    setFeedback({ visible: true, texto, tipo });
    setTimeout(() => setFeedback({ visible: false, texto: '', tipo: '' }), 3000);
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    const res = await buscarEnApiExterna(busqueda);
    setResultados(res);
  };

  const seleccionarAlbum = (album) => {
    // iTunes devuelve portadas pequeñas (100x100), cambiamos la URL para obtener una más grande
    const imagenGrande = album.artworkUrl100.replace('100x100bb', '600x600bb');
    setFormulario({
      ...formulario,
      titulo: album.collectionName,
      artista: album.artistName,
      imagen: imagenGrande,
      tags: [album.primaryGenreName]
    });
    setResultados([]); // Limpiar búsqueda
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormulario({ ...formulario, imagen: reader.result });
      };
      reader.readAsDataURL(file); // Convierte a Base64 para guardar en JSON
    }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      await localApi.post('/productos', formulario);
      mostrarFeedback('¡Disco guardado con éxito!', 'exito');
      setFormulario({ titulo: '', artista: '', precio: 4990, stock: 10, imagen: '', tags: [] });
    } catch (error) {
      mostrarFeedback('Error al guardar el disco.', 'error');
    }
  };

  return (
    <section className="section-padding">
      <div className="glass-panel form-box" style={{ maxWidth: '800px', width: '100%' }}>
        <h2 className="ultra-holo">Panel de Administración</h2>
        <p className="switch-text" style={{ marginBottom: '2rem' }}>Añadir nuevo disco al catálogo</p>

        {feedback.visible && (
          <div className={`mensaje-feedback mensaje-${feedback.tipo}`} style={{ display: 'block' }}>
            {feedback.texto}
          </div>
        )}

        {/* Buscador de API Externa */}
        <form onSubmit={handleBuscar} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
            <input type="text" placeholder="Buscar artista o álbum en la red..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          </div>
          <button type="submit" className="btn">Buscar</button>
        </form>

        {/* Resultados de búsqueda */}
        {resultados.length > 0 && (
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', marginBottom: '2rem', paddingBottom: '1rem' }}>
            {resultados.map(album => (
              <div key={album.collectionId} onClick={() => seleccionarAlbum(album)} style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px', minWidth: '120px' }}>
                <img src={album.artworkUrl100} alt="Portada" style={{ width: '100%', borderRadius: '4px' }} />
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: 'bold' }}>{album.collectionName}</p>
              </div>
            ))}
          </div>
        )}

        {/* Formulario CRUD */}
        <form onSubmit={handleGuardar}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label>Título</label>
              <input type="text" value={formulario.titulo} onChange={e => setFormulario({...formulario, titulo: e.target.value})} required />
            </div>
            <div className="input-group">
              <label>Artista</label>
              <input type="text" value={formulario.artista} onChange={e => setFormulario({...formulario, artista: e.target.value})} required />
            </div>
            <div className="input-group">
              <label>Precio (CLP)</label>
              <input type="number" value={formulario.precio} onChange={e => setFormulario({...formulario, precio: Number(e.target.value)})} required />
            </div>
            <div className="input-group">
              <label>Stock</label>
              <input type="number" value={formulario.stock} onChange={e => setFormulario({...formulario, stock: Number(e.target.value)})} required />
            </div>
          </div>

          <div className="input-group">
            <label>Imagen Personalizada (Reemplaza la de internet)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ padding: '8px' }} />
          </div>

          {formulario.imagen && (
            <div style={{ margin: '1rem 0', textAlign: 'center' }}>
              <img src={formulario.imagen} alt="Vista previa" style={{ maxWidth: '150px', borderRadius: '8px', border: '1px solid #b379f2' }} />
            </div>
          )}

          <button type="submit" className="btn btn-full">Guardar en Base de Datos</button>
        </form>
      </div>
    </section>
  );
}