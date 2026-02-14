import axios from 'axios';

// Use relative URL so Vite's proxy handles it:
// /api → http://localhost:8080/api (defined in vite.config.js)
const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: automatically attach JWT token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor: if token is expired/invalid (401) on protected routes, log user out
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Only redirect to login on 401 for protected routes, not auth routes
        if (error.response?.status === 401 && !error.config.url.includes('/auth/')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;