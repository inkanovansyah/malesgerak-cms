import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api', // Example base URL
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors can be added here for request/response handling
api.interceptors.request.use(
    (config) => {
        // You can add auth tokens here if needed
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle global error responses here
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access
        }
        return Promise.reject(error);
    }
);

export default api;
