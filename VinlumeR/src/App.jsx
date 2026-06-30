// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Carrito from './pages/Carrito';
import AdminPanel from './pages/AdminPanel';
import { localApi } from './utils/api';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [toast, setToast] = useState({ visible: false, mensaje: '' });

  // Cargar sesión y productos al iniciar
  useEffect(() => {
    const sesionGuardada = localStorage.getItem('vinlume_session');
    if (sesionGuardada) setUsuario(JSON.parse(sesionGuardada));

    // Consumir API Rest para obtener productos
    const cargarProductos = async () => {
      try {
        const { data } = await localApi.get('/productos');
        setProductos(data);
      } catch (error) {
        console.error("Error cargando productos. ¿Está encendido json-server?");
      }
    };
    cargarProductos();
  }, []);

  // ... (Mantén tu código de mostrarToast y agregarAlCarrito intacto) ...
  const mostrarToast = (mensaje) => {
    setToast({ visible: true, mensaje });
    setTimeout(() => setToast({ visible: false, mensaje: '' }), 3000);
  };

  const agregarAlCarrito = (producto) => {
      // ... tu lógica original de agregarAlCarrito ...
  };

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Router>
      <Navbar usuario={usuario} setUsuario={(u) => {
        setUsuario(u);
        if(!u) localStorage.removeItem('vinlume_session'); // Borrar sesión al salir
      }} totalItems={totalItems} />
      
      {/* Toast UI */}
      {/* ... tu código original del Toast ... */}

      <Routes>
        <Route path="/" element={<Landing productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/auth" element={<Auth setUsuario={setUsuario} />} />
        <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
        
        {/* Ruta protegida para el Admin */}
        <Route 
          path="/admin" 
          element={usuario?.rol === 'admin' ? <AdminPanel /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;