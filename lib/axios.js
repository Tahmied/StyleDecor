import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BACKEND_URI, 
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;