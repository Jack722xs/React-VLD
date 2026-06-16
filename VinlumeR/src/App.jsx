// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Auth from './pages/Auth';

function App() {
  // Aquí guardamos la sesión del usuario para que toda la app lo sepa
  const [usuario, setUsuario] = useState(null);

  return (
    <Router>
      {/* El Navbar siempre visible, pasándole los datos del usuario */}
      <Navbar usuario={usuario} setUsuario={setUsuario} />
      
      <Routes>
        {/* Ruta principal: Landing Page */}
        <Route path="/" element={<Landing />} />
        
        {/* Ruta de autenticación: Login y Registro */}
        <Route path="/auth" element={<Auth setUsuario={setUsuario} />} />
      </Routes>
    </Router>
  );
}

export default App;