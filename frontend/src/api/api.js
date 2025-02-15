// src/api/api.js
import axios from 'axios';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:5001/api',
});

// Request interceptor to attach the JWT token to headers
api.interceptors.request.use(
  (config) => {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    if (tokens) {
      config.headers.authorization = `Bearer ${tokens}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If Unauthorized, possibly redirect to login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('tokens');
      history.push('/login');
      window.location.reload(); // Force reload to reset state
    }
    console.log(error);
    return Promise.reject(error);
  }
);

export default api;