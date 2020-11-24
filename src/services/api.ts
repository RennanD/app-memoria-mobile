import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  // baseURL: 'https://app-memoria.tk',
});

export default api;
