import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ usuario, setUsuario, totalItems }) {
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
          <li><a href="/#inicio">Inicio</a></li>
          <li><a href="/#proceso">Cómo Funciona</a></li>
          <li><a href="/#tecnologia">Tecnología NFC</a></li>
          <li><a href="/#catalogo">Catálogo</a></li>
          <li><a href="/#faq">FAQ</a></li>
          
          {/* Botón vista del Carrito */}

          <li>
            <Link to="/carrito" className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 15px', textDecoration: 'none' }}>
              🛒 <span className="cart-count">{totalItems}</span>
            </Link>
          </li>

          {usuario ? (
            <>
              {usuario.rol === 'admin' && (
                <li>
                  <Link to="/admin" className="outline-btn" style={{ borderColor: '#00d4ff', color: '#00d4ff', textDecoration: 'none' }}>
                    Panel Admin
                  </Link>
                </li>
              )}
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