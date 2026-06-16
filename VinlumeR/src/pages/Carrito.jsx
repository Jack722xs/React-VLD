// src/pages/Carrito.jsx
import { Link } from 'react-router-dom';
import '../styles/landing.css'; // Usamos las clases principales de tu CSS

export default function Carrito({ carrito, setCarrito }) {
  
  // Calcular el total a pagar
  const totalPagar = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const eliminarProducto = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const modificarCantidad = (id, delta) => {
    setCarrito(carrito.map(item => {
      if (item.id === id) {
        const nuevaCantidad = item.cantidad + delta;
        // Evitamos que baje de 1 y que supere el stock máximo de 10
        if (nuevaCantidad > 0 && nuevaCantidad <= item.stock) {
          return { ...item, cantidad: nuevaCantidad };
        }
      }
      return item;
    }));
  };

  return (
    <section className="section-padding" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="section-content">
        <h2 className="section-title">Tu <span className="holo-text">Bolsa</span></h2>
        
        {carrito.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Tu carrito está vacío </h3>
            <p style={{ color: '#a1accb', marginBottom: '2rem' }}>¡Es el momento perfecto para descubrir Vinlume Disk!</p>
            <Link to="/" className="btn">Volver al Catálogo</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            
            <div style={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {carrito.map((item) => (
                <div key={item.id} className="glass-panel" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.5rem' }}>
                  <img 
                    src={item.imagen} 
                    alt={item.titulo} 
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }} 
                  />
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.2rem' }}>{item.titulo}</h3>
                    <p style={{ color: '#a1accb', margin: '0 0 1rem 0' }}>{item.artista}</p>
                    <p style={{ fontWeight: 'bold', color: '#b379f2' }}>CLP {item.precio.toLocaleString('es-CL')}</p>
                  </div>

                  {/* Controles de Cantidad */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px' }}>
                    <button onClick={() => modificarCantidad(item.id, -1)} style={{ background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>-</button>
                    <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.cantidad}</span>
                    <button onClick={() => modificarCantidad(item.id, 1)} style={{ background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>+</button>
                  </div>

                  {/* Eliminar */}
                  <button onClick={() => eliminarProducto(item.id)} className="outline-btn btn-peligro" style={{ padding: '8px 12px' }}>
                    X
                  </button>
                </div>
              ))}
            </div>

            {/* Resumen de Compra (Derecha) */}
            <div style={{ flex: '1 1 30%' }}>
              <div className="glass-panel" style={{ position: 'sticky', top: '100px', padding: '2rem' }}>
                <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>Resumen del pedido</h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#a1accb' }}>
                  <span>Subtotal</span>
                  <span>CLP {totalPagar.toLocaleString('es-CL')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: '#a1accb' }}>
                  <span>Envío</span>
                  <span>Calculado en el checkout</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 'bold', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                  <span>Total</span>
                  <span className="holo-text">CLP {totalPagar.toLocaleString('es-CL')}</span>
                </div>

                <button className="btn btn-full" style={{ width: '100%' }}>Proceder al Pago</button>
                <Link to="/" className="outline-btn" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', textDecoration: 'none' }}>
                  Seguir Comprando
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}