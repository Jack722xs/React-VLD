// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ usuario, setUsuario, cantidadCarrito, verCarrito }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsuario(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo ultra-holo" style={{ textDecoration: 'none' }}>
          VINLUME
        </Link>
        
        <ul className="nav-links">
          {/* Solución al enlace de Inicio: ahora fuerza la navegación al id="inicio" */}
          <li><a href="/#inicio">Inicio</a></li>
          <li><a href="/#proceso">Cómo Funciona</a></li>
          <li><a href="/#tecnologia">Tecnología NFC</a></li>
          <li><a href="/#catalogo">Catálogo</a></li>
          <li><a href="/#faq">FAQ</a></li>
          
          {/* Botón de Carrito Dinámico */}
          <li>
            <button 
              className="btn" 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 15px' }}
              onClick={verCarrito}
            >
              🛒 <span className="cart-count">{cantidadCarrito}</span>
            </button>
          </li>

          {usuario ? (
            <>
              <li><button className="outline-btn" style={{ cursor: 'default' }}>Hola, {usuario.nombre}</button></li>
              <li><button onClick={handleLogout} className="outline-btn btn-peligro">Salir</button></li>
            </>
          ) : (
            <li>
              <Link to="/auth" className="outline-btn" style={{ textDecoration: 'none', padding: '8px 20px' }}>
                Acceso / Registro
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}