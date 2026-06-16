// src/pages/Auth.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion, registrarUsuario, validarCorreo } from '../utils/auth';
import '../styles/login.css';

export default function Auth({ setUsuario }) {
  const [esLogin, setEsLogin] = useState(true);
  const [feedback, setFeedback] = useState({ visible: false, texto: '', tipo: '' });
  const navigate = useNavigate();

  const [logCorreo, setLogCorreo] = useState('');
  const [logPass, setLogPass] = useState('');

  const [regNombre, setRegNombre] = useState('');
  const [regCorreo, setRegCorreo] = useState('');
  const [regPass, setRegPass] = useState('');

  const mostrarFeedback = (texto, tipo) => {
    setFeedback({ visible: true, texto, tipo });
    setTimeout(() => setFeedback({ visible: false, texto: '', tipo: '' }), 4000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const res = iniciarSesion(logCorreo, logPass);
    if (res.exito) {
      setUsuario(res.usuario);
      mostrarFeedback("¡Acceso concedido!", 'exito');
      setTimeout(() => navigate('/'), 1500);
    } else {
      mostrarFeedback(res.mensaje, 'error');
    }
  };

  const handleRegistro = (e) => {
    e.preventDefault();

    if (!validarCorreo(regCorreo)) {
      mostrarFeedback("Formato de correo inválido.", 'error');
      return;
    }

    const res = registrarUsuario(regNombre, regCorreo, regPass);
    mostrarFeedback(res.mensaje, res.exito ? 'exito' : 'error');
    if (res.exito) {
      setRegNombre('');
      setRegCorreo('');
      setRegPass('');
      setTimeout(() => setEsLogin(true), 1500);
    }
  };

  return (
    <section id="vista-auth" className="section-padding">
      <div className="glass-panel form-box">
        
        {feedback.visible && (
          <div className={`mensaje-feedback mensaje-${feedback.tipo}`} style={{ display: 'block' }}>
            {feedback.texto}
          </div>
        )}

        {esLogin ? (
          <div id="caja-login">
            <h2 className="ultra-holo">Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="log-correo">Correo</label>
                <input 
                  type="email" 
                  id="log-correo" 
                  value={logCorreo} 
                  onChange={(e) => setLogCorreo(e.target.value)} 
                  required 
                />
              </div>
              <div className="input-group">
                <label htmlFor="log-pass">Contraseña</label>
                <input 
                  type="password" 
                  id="log-pass" 
                  value={logPass} 
                  onChange={(e) => setLogPass(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-full">Entrar</button>
            </form>
            <p className="switch-text">
              ¿No tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); setEsLogin(false); }}>Regístrate</a>
            </p>
          </div>
        ) : (
          <div id="caja-registro">
            <h2 className="ultra-holo">Crear Cuenta</h2>
            <form onSubmit={handleRegistro}>
              <div className="input-group">
                <label htmlFor="reg-nombre">Nombre</label>
                <input 
                  type="text" 
                  id="reg-nombre" 
                  value={regNombre} 
                  onChange={(e) => setRegNombre(e.target.value)} 
                  required 
                />
              </div>
              <div className="input-group">
                <label htmlFor="reg-correo">Correo</label>
                <input 
                  type="email" 
                  id="reg-correo" 
                  value={regCorreo} 
                  onChange={(e) => setRegCorreo(e.target.value)} 
                  required 
                />
              </div>
              <div className="input-group">
                <label htmlFor="reg-pass">Contraseña</label>
                <input 
                  type="password" 
                  id="reg-pass" 
                  value={regPass} 
                  onChange={(e) => setRegPass(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-full">Registrarse</button>
            </form>
            <p className="switch-text">
              ¿Ya tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); setEsLogin(true); }}>Inicia Sesión</a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}