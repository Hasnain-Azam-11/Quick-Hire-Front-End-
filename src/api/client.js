import axios from 'axios';
import { getToken } from './token';

// In development this is "/backend" (proxied to Django by Vite, see vite.config.js).
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/backend',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// The backend uses DRF token auth: `Authorization: Token <key>`.
client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

export default client;
