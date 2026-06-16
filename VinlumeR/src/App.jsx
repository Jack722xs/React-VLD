// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Auth from './pages/Auth';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [carrito, setCarrito] = useState([]);
  
  // Estado para nuestra notificación elegante (Toast)
  const [toast, setToast] = useState({ visible: false, mensaje: '' });

  // Función para mostrar la notificación en pantalla por 3 segundos
  const mostrarToast = (mensaje) => {
    setToast({ visible: true, mensaje });
    setTimeout(() => setToast({ visible: false, mensaje: '' }), 3000);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    mostrarToast(`🛒 ${producto} añadido a la bolsa`);
  };

  const verCarrito = () => {
    mostrarToast(`Tienes ${carrito.length} productos en la bolsa. (Checkout en construcción)`);
  };

  return (
    <Router>
      {/* Pasamos verCarrito al Navbar para que el botón lo use */}
      <Navbar usuario={usuario} setUsuario={setUsuario} cantidadCarrito={carrito.length} verCarrito={verCarrito} />
      
      {/* Notificación Toast UI Integrada (Estilo Vinlume) */}
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
        <Route path="/" element={<Landing agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/auth" element={<Auth setUsuario={setUsuario} />} />
      </Routes>
    </Router>
  );
}

export default App;