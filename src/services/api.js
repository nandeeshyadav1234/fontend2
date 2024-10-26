// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Set your backend URL here
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
