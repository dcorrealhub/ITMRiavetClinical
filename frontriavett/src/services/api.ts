import axios from 'axios';

// Configuración simple - URL directa del backend
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8082';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para requests (opcional - para debugging)
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses (manejo de errores)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // El servidor respondió con error
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // No se recibió respuesta
      console.error('Network Error: No response from server');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
