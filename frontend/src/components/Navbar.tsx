import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart, User, LogOut, Home, Package, Plus, Settings } from 'lucide-react';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-secondary-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold text-primary-600"
          >
            <ShoppingCart className="h-8 w-8" />
            <span>CumRoad</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link 
              to="/products"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/products') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-50'
              }`}
            >
              <Package className="h-4 w-4" />
              <span>Products</span>
            </Link>

            {isAuthenticated && (
              <>
                <Link 
                  to="/dashboard"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard') 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-50'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>

                <Link 
                  to="/products/new"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/products/new') 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-50'
                  }`}
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Product</span>
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm text-secondary-700">
                    Welcome, {user?.name || user?.email}
                  </span>
                  {user?.role === 'admin' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Admin
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Link
                    to="/profile"
                    className="p-2 text-secondary-400 hover:text-secondary-600 rounded-full hover:bg-secondary-100 transition-colors"
                  >
                    <Settings className="h-5 w-5" />
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="p-2 text-secondary-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-secondary-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-secondary-200">
          <Link 
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
              isActive('/') 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-50'
            }`}
          >
            Home
          </Link>
          
          <Link 
            to="/products"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
              isActive('/products') 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-50'
            }`}
          >
            Products
          </Link>

          {isAuthenticated && (
            <>
              <Link 
                to="/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/dashboard') 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-50'
                }`}
              >
                Dashboard
              </Link>

              <Link 
                to="/products/new"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/products/new') 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-50'
                }`}
              >
                Create Product
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
