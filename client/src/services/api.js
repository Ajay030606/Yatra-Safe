import axios from 'axios';

// Dynamic base URL:
// - If VITE_API_URL is provided in environment variables, use it.
//   Ensures it always ends with '/api' (whether user enters with or without '/api').
// - Otherwise, default to '/api' (works with Vercel rewrites and Vite dev proxy).
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    let url = import.meta.env.VITE_API_URL.replace(/\/+$/, '');
    if (!url.endsWith('/api')) {
      url += '/api';
    }
    return url;
  }
  return '/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
});

export default api;
