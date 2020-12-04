import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.0.100:3333',
  // baseURL: 'https://api-memoria.herokuapp.com',
});

export default api;
