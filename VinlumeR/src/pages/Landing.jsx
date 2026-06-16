// src/pages/Landing.jsx
import { useState, useEffect } from 'react';
import '../styles/landing.css';

export default function Landing({ agregarAlCarrito }) {
  const [imgIndex, setImgIndex] = useState(0);
  
  // AHORA APUNTA A LA CARPETA CORRECTA "/imagenes/"
  const imagenes = [
    "/imagenes/imagen1.jpg",
    "/imagenes/imagen2.webp",
    "/imagenes/imagen3.jpg",
    "/imagenes/imagen4.webp" 
  ];

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % imagenes.length);
    }, 3000);
    return () => clearInterval(intervalo);
  }, [imagenes.length]);

  const toggleFavorito = (e) => {
    e.preventDefault();
    e.currentTarget.classList.toggle('active');
  };

  return (
    <>
      {/* Hero con Carrusel de Fondo */}
      <header className="hero" id="inicio" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Capa del carrusel */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundColor: '#000' }}>
          <img 
            src={imagenes[imgIndex]} 
            alt="Fondo Vinlume" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              opacity: 0.3, // Oscurecido para que el texto destaque
              transition: 'opacity 0.8s ease-in-out' 
            }} 
          />
        </div>

        {/* Contenido del Hero */}
        <div className="hero-inner" style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="holo-text mega-title">Vinlume Disk</h1>
          <p>La evolución de tu música favorita. Réplicas artesanales con tecnología NFC para conectar tu mundo físico con tu biblioteca digital.</p>
          <a href="#catalogo" className="btn">Explorar Catálogo</a>
        </div>
      </header>

      <main>
        {/* --- SECCIÓN PROCESO --- */}
        <section className="proceso-section" id="proceso">
          <div className="section-content">
            <h2 className="section-title">Tu <span className="holo-text">música</span> en 3 pasos</h2>
            <div className="proceso-grid">
              <div className="proceso-step">
                <div className="step-number">1</div>
                <h3>Elige tu Álbum</h3>
                <p>Selecciona entre nuestros diseños clásicos o solicita uno personalizado.</p>
              </div>
              <div className="proceso-step">
                <div className="step-number">2</div>
                <h3>Recibe el Llavero</h3>
                <p>Réplicas en acrílico de alta calidad con impresión premium y chip NFC integrado.</p>
              </div>
              <div className="proceso-step">
                <div className="step-number">3</div>
                <h3>Acerca y Disfruta</h3>
                <p>Solo acerca tu teléfono al mini CD y tu música comenzará a sonar al instante.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECCIÓN TECNOLOGÍA --- */}
        <section className="nfc-showcase" id="tecnologia">
          <div className="section-content">
            <h2 className="section-title">El poder del <span className="holo-text">NFC</span></h2>
            <div className="showcase-row">
              <div className="showcase-img">
                <img src="/images/NFC/NFCchip.jpg" alt="Microchip NFC integrado" />
              </div>
              <div className="showcase-text">
                <h3>¿Qué es la Tecnología NFC?</h3>
                <p>NFC (Near Field Communication) permite la transmisión de datos a corta distancia de forma instantánea. Nuestros llaveros integran un microchip pasivo que no requiere baterías ni recargas; se alimenta directamente de la energía electromagnética que emite tu teléfono al acercarlo.</p>
              </div>
            </div>
            <div className="showcase-row reverse">
              <div className="showcase-img">
                <img src="/images/NFC/Celular.webp" alt="Compatibilidad con Smartphone" />
              </div>
              <div className="showcase-text">
                <h3>Compatibilidad Universal</h3>
                <p>La inmensa mayoría de los smartphones actuales son compatibles de forma nativa. En los dispositivos Android, el lector suele ubicarse en el centro de la parte trasera, mientras que en los iPhone se encuentra en la parte superior, junto a las cámaras. No necesitas instalar absolutamente ninguna aplicación adicional.</p>
              </div>
            </div>
            <div className="showcase-row">
              <div className="showcase-img">
                <img src="/images/NFC/plataformasMS.png" alt="Conexión Directa a Música" />
              </div>
              <div className="showcase-text">
                <h3>Conexión Directa a tu Música</h3>
                <p>Al escanear el llavero, el chip envía un enlace codificado que ordena a tu teléfono abrir tu aplicación de música favorita (como Spotify, Apple Music o YouTube) y comenzar a reproducir el álbum al instante. Es el puente definitivo entre el coleccionismo físico y la comodidad digital.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- CATÁLOGO CON BOTONES DE COMPRA CONECTADOS --- */}
        <section className="catalogo" id="catalogo">
          <div className="section-content">
            <h2 className="section-title sticky-title">Nuestro <span className="holo-text">Catálogo</span></h2>
            
            <div className="grid" role="list">
              <article className="card holo-card" role="listitem">
                <div className="card-image">
                  <img src="/images/rage again the machine/homonimo/rageA.webp" alt="Rage Against the Machine" />
                  <button className="fav-btn" onClick={toggleFavorito}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  </button>
                </div>
                <div className="card-body">
                  <h2>Homonimo</h2>
                  <p className="artista">Rage Against the Machine</p>
                  <div className="tags"><span className="tag">Rap Metal</span></div>
                  <div className="card-footer">
                    <p className="precio">CLP 4.990</p>
                    {/* Botón conectado al estado global */}
                    <button className="btn buy-btn" onClick={() => agregarAlCarrito("Rage Against the Machine - Homonimo")}>Comprar</button>
                  </div>
                </div>
              </article>

              <article className="card holo-card" role="listitem">
                <div className="card-image">
                  <img src="/images/top/homonimo/top1.webp" alt="Twenty One Pilots" />
                  <button className="fav-btn" onClick={toggleFavorito}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  </button>
                </div>
                <div className="card-body">
                  <h2>Homonimo</h2>
                  <p className="artista">Twenty One Pilots</p>
                  <div className="tags"><span className="tag">Alternative</span></div>
                  <div className="card-footer">
                    <p className="precio">CLP 4.990</p>
                    <button className="btn buy-btn" onClick={() => agregarAlCarrito("Twenty One Pilots - Homonimo")}>Comprar</button>
                  </div>
                </div>
              </article>

              <article className="card holo-card" role="listitem">
                <div className="card-image">
                  <img src="/images/los bunkers/homonimo/BK1.jpg" alt="Los Bunkers" />
                  <button className="fav-btn" onClick={toggleFavorito}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  </button>
                </div>
                <div className="card-body">
                  <h2>Homonimo</h2>
                  <p className="artista">Los Bunkers</p>
                  <div className="tags"><span className="tag">Rock Chileno</span></div>
                  <div className="card-footer">
                    <p className="precio">CLP 4.990</p>
                    <button className="btn buy-btn" onClick={() => agregarAlCarrito("Los Bunkers - Homonimo")}>Comprar</button>
                  </div>
                </div>
              </article>

              <article className="card holo-card" role="listitem">
                <div className="card-image">
                  <img src="/images/Ado/utattemita/ado1.jpg" alt="Ado - Utattemita" />
                  <button className="fav-btn" onClick={toggleFavorito}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  </button>
                </div>
                <div className="card-body">
                  <h2>Utattemita</h2>
                  <p className="artista">Ado</p>
                  <div className="tags"><span className="tag">J-Pop</span></div>
                  <div className="card-footer">
                    <p className="precio">CLP 4.990</p>
                    <button className="btn buy-btn" onClick={() => agregarAlCarrito("Ado - Utattemita")}>Comprar</button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

      </main>

      {/* --- FOOTER ACTUALIZADO --- */}
     <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Vinlume Disk</h4>
            <p>Transformando la forma en que interactúas con tu música. Hecho para verdaderos fanáticos.</p>
          </div>
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>Email: contacto@vinlumedisk.cl</p>
            <p>WhatsApp: +56 9 1234 5678</p>
          </div>
          <div className="footer-section">
            <h4>Síguenos</h4>
            <div className="social-links">
              <a href="https://www.instagram.com/vinlume_disk/" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Vinlume Disk. Todos los derechos reservados.</p>
          
          {/* Datos del equipo Front End */}
          <div style={{ marginTop: '2rem', color: '#a1accb', fontSize: '0.9rem' }}>
            <p>Jack Mauro Cardenas Garcia</p>
            <p>Víctor Armando Vásquez Muñoz</p>
            <p>Programacion Front End</p>
            <p>Sección D-IEI-N3-P2-C2</p>
          </div>
        </div>
      </footer>
    </>
  );
}