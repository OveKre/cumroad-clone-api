import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CreateProductPage } from './pages/CreateProductPage';
import { MyProductsPage } from './pages/MyProductsPage';
import { EditProductPage } from './pages/EditProductPage';
import { TestPage } from './TestPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 401/403 errors
        if (error?.status === 401 || error?.status === 403) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-secondary-50">
            <Navbar />
            <main>
              <Routes>
                {/* Test route */}
                <Route path="/test" element={<TestPage />} />
                
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                
                {/* Protected routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                          <h1 className="text-2xl font-bold text-secondary-900">Dashboard</h1>
                          <p className="mt-2 text-secondary-600">Welcome to your dashboard!</p>
                          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="card">
                              <h3 className="text-lg font-semibold text-secondary-900 mb-2">My Products</h3>
                              <p className="text-secondary-600 mb-4">Manage your digital products</p>
                              <a href="/my-products" className="btn-primary text-sm">View Products</a>
                            </div>
                            <div className="card">
                              <h3 className="text-lg font-semibold text-secondary-900 mb-2">My Orders</h3>
                              <p className="text-secondary-600 mb-4">View your purchase history</p>
                              <a href="/orders" className="btn-primary text-sm">View Orders</a>
                            </div>
                            <div className="card">
                              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Create Product</h3>
                              <p className="text-secondary-600 mb-4">Add a new digital product</p>
                              <a href="/products/new" className="btn-primary text-sm">Create Now</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ProtectedRoute>
                  }
                />
                
                {/* Placeholder for other protected routes */}
                <Route
                  path="/my-products"
                  element={
                    <ProtectedRoute>
                      <MyProductsPage />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/products/:id/edit"
                  element={
                    <ProtectedRoute>
                      <EditProductPage />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                          <h1 className="text-2xl font-bold text-secondary-900">My Orders</h1>
                          <p className="mt-2 text-secondary-600">Your purchase history (Coming Soon)</p>
                        </div>
                      </div>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/products/new"
                  element={
                    <ProtectedRoute>
                      <CreateProductPage />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                          <h1 className="text-2xl font-bold text-secondary-900">Profile Settings</h1>
                          <p className="mt-2 text-secondary-600">Manage your account settings (Coming Soon)</p>
                        </div>
                      </div>
                    </ProtectedRoute>
                  }
                />
                
                {/* 404 page */}
                <Route path="*" element={
                  <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0 text-center">
                      <h1 className="text-4xl font-bold text-secondary-900 mb-4">404</h1>
                      <h2 className="text-2xl font-semibold text-secondary-700 mb-4">Page Not Found</h2>
                      <p className="text-secondary-600 mb-6">The page you're looking for doesn't exist.</p>
                      <a href="/" className="btn-primary">Go Home</a>
                    </div>
                  </div>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
