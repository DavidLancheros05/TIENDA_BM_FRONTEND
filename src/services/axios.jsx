import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Interceptor para adjuntar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // asegúrate de guardar el token aquí al iniciar sesión

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    //console.log("🔐 [axios] Sin token en localStorage, se enviará sin Authorization");
  }

  //console.log(`📤 [axios] Petición: ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
  return config;
});

api.interceptors.response.use(
  (response) => {
    //console.log(`✅ [axios] Respuesta de ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    //console.error(`❌ [axios] Error en ${error.config?.url || 'desconocido'}:`, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
