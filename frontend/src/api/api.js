import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
// In production (Vercel), VITE_API_URL points to the Render backend.
// In development, falls back to '/api' which is handled by the Vite dev proxy.
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - add token to requests
api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const { token } = JSON.parse(userInfo);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message ||
            error.message ||
            'Something went wrong';

        // Show toast error message
        toast.error(message);

        // Logout user if token is invalid, but only for non-auth requests and when not already on auth pages
        const isAuthRequest = error.config?.url?.includes('/auth/login') || error.config?.url?.includes('/auth/register');
        const isAuthPage = window.location.pathname === '/login' || window.location.pathname === '/register';

        if (error.response?.status === 401 && !isAuthRequest && !isAuthPage) {
            localStorage.removeItem('userInfo');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default api;
