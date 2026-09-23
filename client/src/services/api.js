import axios from 'axios';

// Dynamic base URL:
// - If VITE_API_URL is provided in environment variables, use it (trimming trailing slash).
// - Otherwise, default to '/api' (works with Vercel monorepo rewrites and Vite dev proxy).
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/+$/, '');
  }
  return '/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
});

export default api;
