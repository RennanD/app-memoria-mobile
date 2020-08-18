import axios from 'axios';

const api = axios.create({
  baseURL: 'http://104.248.59.130',
});

export default api;
