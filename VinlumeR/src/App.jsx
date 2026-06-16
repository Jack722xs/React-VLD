// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Carrito from './pages/Carrito';

//Base de Datos
const productosIniciales = [
  { id: 1, titulo: "Homonimo", artista: "Rage Against the Machine", tags: ["Rap Metal", "Rock"], precio: 4990, imagen: "/images/rage again the machine/homonimo/rageA.webp", stock: 10 },
  { id: 2, titulo: "Homonimo", artista: "Twenty One Pilots", tags: ["Alternative", "Indie Pop"], precio: 4990, imagen: "/images/top/homonimo/top1.webp", stock: 10 },
  { id: 3, titulo: "Homonimo", artista: "Los Bunkers", tags: ["Rock Chileno", "Indie"], precio: 4990, imagen: "/images/los bunkers/homonimo/BK1.jpg", stock: 10 },
  { id: 4, titulo: "Utattemita", artista: "Ado", tags: ["J-Pop", "Vocaloid"], precio: 4990, imagen: "/images/Ado/utattemita/ado1.jpg", stock: 10 },
  { id: 5, titulo: "The First Two Records", artista: "Bikini Kill", tags: ["Punk", "Riot Grrrl"], precio: 4990, imagen: "/images/bikini kill/The First two records/The First1.webp", stock: 10 },
  { id: 6, titulo: "Habla Tu Espejo", artista: "Cuarteto de Nos", tags: ["Art Rock", "Post-Punk"], precio: 4990, imagen: "/images/cuarteto de nos/habla tu espejo/1.jpg", stock: 10 },
  { id: 7, titulo: "Blurryface", artista: "Twenty One Pilots", tags: ["Alternative", "Hip Hop"], precio: 4990, imagen: "/images/top/blurryface/blurry1.jpg", stock: 10 },
  { id: 8, titulo: "Breach", artista: "Twenty One Pilots", tags: ["Rock Alternativo", "Concept"], precio: 4990, imagen: "/images/top/breach/breach1.jpg", stock: 10 }
];

function App() {
  const [usuario, setUsuario] = useState(null);
  const [productos, setProductos] = useState(productosIniciales);
  const [carrito, setCarrito] = useState([]);
  const [toast, setToast] = useState({ visible: false, mensaje: '' });

  const mostrarToast = (mensaje) => {
    setToast({ visible: true, mensaje });
    setTimeout(() => setToast({ visible: false, mensaje: '' }), 3000);
  };

  const agregarAlCarrito = (producto) => {
    const itemEnCarrito = carrito.find(item => item.id === producto.id);
    
    if (itemEnCarrito) {
      if (itemEnCarrito.cantidad < producto.stock) {
        setCarrito(carrito.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item));
        mostrarToast(`🛒 Una unidad más de ${producto.titulo} añadida.`);
      } else {
        mostrarToast(`❌ Stock máximo (10) alcanzado para ${producto.titulo}.`);
      }
    } else {
      if (producto.stock > 0) {
        setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        mostrarToast(`🛒 ${producto.titulo} añadido a la bolsa.`);
      } else {
        mostrarToast(`❌ Producto sin stock.`);
      }
    }
  };

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Router>
      <Navbar usuario={usuario} setUsuario={setUsuario} totalItems={totalItems} />
      
      {/* Toast UI */}
      {toast.visible && (
        <div style={{
          position: 'fixed', bottom: '30px', right: '30px', zIndex: 10000,
          background: 'rgba(5, 5, 7, 0.95)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)', borderLeft: '4px solid #b379f2',
          color: '#f4f5f8', padding: '1rem 1.5rem', borderRadius: '8px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)', fontFamily: 'Inter, sans-serif'
        }}>
          {toast.mensaje}
        </div>
      )}
      
      <Routes>
        <Route path="/" element={<Landing productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/auth" element={<Auth setUsuario={setUsuario} />} />
        <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
      </Routes>
    </Router>
  );
}

export default App;