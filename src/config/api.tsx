import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://api.eletrogama.online', // Defina a URL base da sua API
  baseURL: 'http://192.168.1.209:8080',
  timeout: 10000, // Tempo máximo de espera por uma resposta (opcional)
});

export default api;
