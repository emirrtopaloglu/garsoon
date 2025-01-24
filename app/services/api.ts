import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.garsoon.com', // API URL'inizi buraya yazın
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api; 