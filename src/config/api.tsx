import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // Defina a URL base da sua API
    timeout: 5000, // Tempo máximo de espera por uma resposta (opcional)
  });
  
  export default api;