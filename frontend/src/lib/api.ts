import axios from 'axios';
import type { AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Remove invalid token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Custom error class for API errors
export class ApiError extends Error {
  public code?: number;
  public field?: string;
  public status?: number;
  public type?: string;

  constructor(errorData: any, status?: number) {
    super(errorData?.detail || errorData?.message || 'API Error');
    this.name = 'ApiError';
    this.code = errorData?.code;
    this.field = errorData?.field;
    this.status = status;
    this.type = errorData?.type;
  }
}

// Generic request function
async function request<T>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
  } = {}
): Promise<T | null> {
  try {
    const config = {
      method: options.method || 'GET',
      url: endpoint,
      data: options.body,
      headers: options.headers,
    };

    const response: AxiosResponse<T> = await api(config);
    
    // Handle 204 No Content responses
    if (response.status === 204) {
      return null;
    }
    
    return response.data;
  } catch (error: any) {
    const errorData = error.response?.data;
    const status = error.response?.status;
    throw new ApiError(errorData, status);
  }
}

// Export the API service
export const apiService = {
  // Authentication
  login: (credentials: { email: string; password: string }) =>
    request('/sessions', { method: 'POST', body: credentials }),
  
  logout: () =>
    request('/sessions', { method: 'DELETE' }),
  
  register: (userData: { email: string; password: string; name?: string }) =>
    request('/users', { method: 'POST', body: userData }),

  // Users
  getAllUsers: () =>
    request('/users'),
  
  getUser: (id: number) =>
    request(`/users/${id}`),
  
  updateUser: (id: number, data: Partial<{ email: string; name: string }>) =>
    request(`/users/${id}`, { method: 'PATCH', body: data }),
  
  deleteUser: (id: number) =>
    request(`/users/${id}`, { method: 'DELETE' }),

  // Products
  getAllProducts: () =>
    request('/products'),
  
  getProduct: (id: number) =>
    request(`/products/${id}`),
  
  createProduct: (data: {
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
  }) =>
    request('/products', { method: 'POST', body: data }),
  
  updateProduct: (id: number, data: Partial<{
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  }>) =>
    request(`/products/${id}`, { method: 'PATCH', body: data }),
  
  deleteProduct: (id: number) =>
    request(`/products/${id}`, { method: 'DELETE' }),

  // Orders
  getAllOrders: () =>
    request('/orders'),
  
  getOrder: (id: number) =>
    request(`/orders/${id}`),
  
  createOrder: (data: { productId: number; quantity: number }) =>
    request('/orders', { method: 'POST', body: data }),
  
  updateOrder: (id: number, data: Partial<{ status: string }>) =>
    request(`/orders/${id}`, { method: 'PATCH', body: data }),
  
  deleteOrder: (id: number) =>
    request(`/orders/${id}`, { method: 'DELETE' }),
};

export default apiService;
