// User types
export interface User {
  id: number;
  email: string;
  name?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse extends User {
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

// Product types
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}

// Order types
export interface Order {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  Product?: Product;
}

export interface CreateOrderData {
  productId: number;
  quantity: number;
}

export interface UpdateOrderData {
  status?: 'pending' | 'completed' | 'cancelled';
}

// API Error types
export interface ApiErrorData {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  code?: number;
  field?: string;
  message?: string;
}

// Form validation types
export interface FormErrors {
  [key: string]: string | undefined;
}

// Auth context types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  loading: boolean;
}

// Query types for filtering/searching
export interface ProductsQuery {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface OrdersQuery {
  status?: 'pending' | 'completed' | 'cancelled';
  sortBy?: 'createdAt' | 'totalPrice';
  sortOrder?: 'asc' | 'desc';
}
