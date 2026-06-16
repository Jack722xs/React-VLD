import { useState, useEffect } from 'react';
import '../styles/landing.css';

export default function Landing({ productos, agregarAlCarrito }) {
  const [imgIndex, setImgIndex] = useState(0);
  
  const imagenes = [
    "/imagenes/imagen1.jpg",
    "/imagenes/imagen2.webp",
    "/imagenes/imagen3.jpg",
    "/imagenes/imagen4.webp" 
  ];

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % imagenes.length);
    }, 3500);
    return () => clearInterval(intervalo);
  }, [imagenes.length]);

  const toggleFavorito = (e) => {
    e.preventDefault();
    e.currentTarget.classList.toggle('active');
  };

  return (
    <>
      <header className="hero" id="inicio" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundColor: '#000' }}>
          {imagenes.map((img, index) => (
            <img 
              key={index}
              src={img} 
              alt={`Fondo Vinlume ${index}`} 
              style={{ 
                position: 'absolute',
                top: 0, left: 0,
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                opacity: imgIndex === index ? 0.3 : 0, // Transición de opacidad
                transition: 'opacity 1.5s ease-in-out' // Duración del fade
              }} 
            />
          ))}
        </div>

        <div className="hero-inner" style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="holo-text mega-title">Vinlume Disk</h1>
          <p>La evolución de tu música favorita. Réplicas artesanales con tecnología NFC para conectar tu mundo físico con tu biblioteca digital.</p>
          <a href="#catalogo" className="btn">Explorar Catálogo</a>
        </div>
      </header>

      <main>
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

        {/* CATÁLOGO DINÁMICO */}
        <section className="catalogo" id="catalogo">
          <div className="section-content">
            <h2 className="section-title sticky-title">Nuestro <span className="holo-text">Catálogo</span></h2>
            
            <div className="filtros" aria-label="filtros de catálogo">
              <label htmlFor="buscar">Buscar CD</label>
              <input id="buscar" type="search" placeholder="Ej. Rock alternativo" />
            </div>

            <div className="grid" role="list">
              {/* Aquí mapeamos nuestro arreglo de objetos para generar las tarjetas automáticamente */}
              {productos.map((producto) => (
                <article className="card holo-card" role="listitem" key={producto.id}>
                  <div className="card-image">
                    <img src={producto.imagen} alt={producto.artista} />
                    <button className="fav-btn" aria-label="Añadir a favoritos" onClick={toggleFavorito}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                  </div>
                  <div className="card-body">
                    <h2>{producto.titulo}</h2>
                    <p className="artista">{producto.artista}</p>
                    <div className="tags">
                      {producto.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>
                    <div className="card-footer">
                      <p className="precio">CLP {producto.precio.toLocaleString('es-CL')}</p>
                      <button className="btn buy-btn" onClick={() => agregarAlCarrito(producto)}>Comprar</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="section-content">
            <h2 className="section-title">Preguntas Frecuentes</h2>
            <div className="faq-container">
              <details className="faq-item">
                <summary>¿Es compatible con mi teléfono?</summary>
                <p>Sí, la mayoría de los smartphones modernos (iPhone 7 en adelante y casi todos los Android con NFC) son compatibles sin necesidad de apps adicionales.</p>
              </details>
              <details className="faq-item">
                <summary>¿Hacen envíos a regiones?</summary>
                <p>Realizamos envíos a todo Chile a través de Starken o Chilexpress, con seguimiento en tiempo real.</p>
              </details>
              <details className="faq-item">
                <summary>¿Puedo solicitar un álbum personalizado?</summary>
                <p>¡Absolutamente! Si tu álbum, playlist o artista favorito no está en nuestro catálogo, escríbenos por Instagram o WhatsApp y fabricaremos uno exclusivo para ti.</p>
              </details>
              <details className="faq-item">
                <summary>¿Cuánto tiempo demora la fabricación?</summary>
                <p>Los pedidos personalizados toman entre 3 a 5 días hábiles de producción antes de ser despachados.</p>
              </details>
              <details className="faq-item">
                <summary>¿Se raya o se borra la imagen con el tiempo?</summary>
                <p>No, la impresión está encapsulada dentro del acrílico de alta durabilidad, por lo que la imagen está protegida de rayones y del desgaste por el uso diario.</p>
              </details>
            </div>
          </div>
        </section>
      </main>

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