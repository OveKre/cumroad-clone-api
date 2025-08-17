import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, ApiError } from '../lib/api';
import type { User, LoginCredentials, RegisterData, AuthContextType } from '../lib/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  // Initialize auth state on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
      } catch (error) {
        // Invalid stored data, clear it
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setLoading(true);
      const response = await apiService.login(credentials) as any;
      
      if (response && response.token) {
        const { token: authToken, ...userData } = response;
        
        // Store in localStorage
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Update state
        setToken(authToken);
        setUser(userData);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      // Clear any stored data on error
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      
      if (error instanceof ApiError) {
        throw error;
      } else {
        throw new ApiError({ detail: 'Login failed' }, 500);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Call logout endpoint to blacklist token
      await apiService.logout();
    } catch (error) {
      // Even if logout fails, clear local state
      console.warn('Logout API call failed:', error);
    } finally {
      // Always clear local state
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      setLoading(true);
      const newUser = await apiService.register(userData) as any;
      
      if (newUser) {
        // After successful registration, automatically log in
        await login({ email: userData.email, password: userData.password });
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        throw new ApiError({ detail: 'Registration failed' }, 500);
      }
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    register,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthContext };
