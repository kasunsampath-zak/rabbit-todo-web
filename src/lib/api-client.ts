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

// Helper function to safely encode credentials for Basic Auth
function encodeCredentials(username: string, password: string): string {
  // Use Buffer if available (Node.js), otherwise btoa (browser)
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(`${username}:${password}`).toString('base64');
  }
  // For browser, properly encode UTF-8 characters
  const credentials = `${username}:${password}`;
  const bytes = new TextEncoder().encode(credentials);
  const binaryString = Array.from(bytes, byte => String.fromCharCode(byte)).join('');
  return btoa(binaryString);
}

// Basic Auth interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get Basic Auth credentials from local storage only (client-side)
    // Never use NEXT_PUBLIC_ env vars for credentials as they are exposed to client
    const username = typeof window !== 'undefined' ? localStorage.getItem('api_username') : null;
    const password = typeof window !== 'undefined' ? localStorage.getItem('api_password') : null;

    if (username && password) {
      const token = encodeCredentials(username, password);
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
