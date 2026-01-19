import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Basic Auth interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get Basic Auth credentials from environment or local storage
    const username = process.env.NEXT_PUBLIC_API_USERNAME || 
                     (typeof window !== 'undefined' ? localStorage.getItem('api_username') : null);
    const password = process.env.NEXT_PUBLIC_API_PASSWORD || 
                     (typeof window !== 'undefined' ? localStorage.getItem('api_password') : null);

    if (username && password) {
      const token = btoa(`${username}:${password}`);
      config.headers.Authorization = `Basic ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== 'undefined') {
        localStorage.removeItem('api_username');
        localStorage.removeItem('api_password');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
