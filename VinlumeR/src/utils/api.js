import axios from 'axios';

// Instancia para nuestra API local (JSON Server)
export const localApi = axios.create({
  baseURL: 'http://localhost:3000'
});

// Autenticación
export const iniciarSesion = async (correo, password) => {
  try {
    const { data } = await localApi.get(`/usuarios?correo=${correo}&password=${password}`);
    if (data.length > 0) {
      const usuario = data[0];
      // Guardar sesión en localStorage
      localStorage.setItem('vinlume_session', JSON.stringify(usuario));
      return { exito: true, usuario };
    }
    return { exito: false, mensaje: "Correo o contraseña incorrectos." };
  } catch (error) {
    return { exito: false, mensaje: "Error al conectar con el servidor." };
  }
};

export const registrarUsuario = async (nombre, correo, password) => {
  try {
    const { data: existe } = await localApi.get(`/usuarios?correo=${correo}`);
    if (existe.length > 0) return { exito: false, mensaje: "El correo ya está registrado." };
    
    await localApi.post('/usuarios', { nombre, correo, password, rol: 'user' });
    return { exito: true, mensaje: "¡Cuenta creada! Ya puedes iniciar sesión." };
  } catch (error) {
    return { exito: false, mensaje: "Error al registrar el usuario." };
  }
};

//(iTunes API)
export const buscarEnApiExterna = async (query) => {
  try {
    const { data } = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=album&limit=5`);
    return data.results; // Devuelve los álbumes encontrados
  } catch (error) {
    console.error("Error buscando en API externa", error);
    return [];
  }
};