// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ usuario, setUsuario }) {
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    setUsuario(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo ultra-holo" style={{ textDecoration: 'none' }}>
          VINLUME
        </Link>
        
        <ul className="nav-links">
          {/* Enlaces de la Landing Page original */}
          <li><Link to="/">Inicio</Link></li>
          <li><a href="/#proceso">Cómo Funciona</a></li>
          <li><a href="/#tecnologia">Tecnología NFC</a></li>
          <li><a href="/#catalogo">Catálogo</a></li>
          <li><a href="/#faq">FAQ</a></li>
          
          {/* Nuevo Botón de Carrito de Compras */}
          <li>
            <button 
              className="btn" 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 15px' }}
              onClick={() => alert("Carrito de compras en construcción 🛒")}
            >
              🛒 <span className="cart-count">0</span>
            </button>
          </li>

          {/* Opciones de Usuario / Autenticación */}
          {usuario ? (
            <>
              <li>
                <button className="outline-btn" style={{ cursor: 'default' }}>
                  Hola, {usuario.nombre}
                </button>
              </li>
              <li>
                <button onClick={handleLogout} className="outline-btn btn-peligro">
                  Salir
                </button>
              </li>
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