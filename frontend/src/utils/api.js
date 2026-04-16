import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  }
});

/**
 * INTERCEPTOR: Automatic Security
 * Run before request send>.
 * this make sure X-XSRF-TOKEN always update and decode was right.
 */
api.interceptors.request.use((config) => {
  const rawToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];

  if (rawToken) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(rawToken);
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;