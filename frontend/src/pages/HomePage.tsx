import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../hooks/useProducts';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/Messages';
import { FiShoppingCart, FiStar, FiUsers, FiPackage } from 'react-icons/fi';
import type { Product } from '../lib/types';

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="card hover:shadow-lg transition-shadow duration-200"
    >
      <div className="aspect-w-16 aspect-h-9 mb-4">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-48 bg-secondary-200 rounded-lg flex items-center justify-center">
            <FiPackage className="h-12 w-12 text-secondary-400" />
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2">
        {product.name}
      </h3>
      
      {product.description && (
        <p className="text-secondary-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
      )}
      
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-primary-600">
          ${product.price.toFixed(2)}
        </span>
        <button className="btn-primary text-sm">
          View Details
        </button>
      </div>
    </Link>
  );
}

function FeaturedProducts() {
  const { data: products, isLoading, error } = useProducts();
  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage message="Failed to load products. Please try again later." />
    );
  }

  const featuredProducts = (products as Product[] || []).slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-secondary-900 sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-xl text-secondary-600">
            Discover amazing digital products from talented creators
          </p>
        </div>

        {featuredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/products" className="btn-outline">
                View All Products
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <FiPackage className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">
              No products yet
            </h3>
            <p className="text-secondary-600 mb-6">
              Be the first to create and sell digital products on our platform.
            </p>
            {user ? (
              <Link to="/products/new" className="btn-primary">
                Create First Product
              </Link>
            ) : (
              <Link to="/register" className="btn-primary">
                Sign Up to Create Products
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function HomePage() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-secondary-900 sm:text-5xl md:text-6xl">
              <span className="block">Sell Digital Products</span>
              <span className="block text-primary-600">With Ease</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-secondary-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Create, sell, and distribute your digital products to a global audience. 
              From ebooks to software, art to music - start monetizing your creativity today.
            </p>
            {!user && (
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link
                    to="/register"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get Started
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Link
                    to="/products"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-secondary-50 md:py-4 md:text-lg md:px-10"
                  >
                    Browse Products
                  </Link>
                </div>
              </div>
            )}
            {user && (
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link
                    to="/dashboard"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                  >
                    Go to Dashboard
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Link
                    to="/products/new"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-secondary-50 md:py-4 md:text-lg md:px-10"
                  >
                    Create Product
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-secondary-900 sm:text-4xl">
              Why Choose CumRoad?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <FiShoppingCart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Easy to Sell
              </h3>
              <p className="text-secondary-600">
                Upload your digital products and start selling in minutes. 
                No technical knowledge required.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <FiUsers className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Global Reach
              </h3>
              <p className="text-secondary-600">
                Connect with customers worldwide and grow your digital business 
                beyond geographical boundaries.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <FiStar className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Quality Products
              </h3>
              <p className="text-secondary-600">
                Discover high-quality digital products from verified creators 
                and independent sellers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* CTA Section */}
      <section className="bg-primary-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          {!user ? (
            <>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className="block">Ready to start selling?</span>
                <span className="block text-primary-200">Create your first product today.</span>
              </h2>
              <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                <div className="inline-flex rounded-md shadow">
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-secondary-50"
                  >
                    Sign Up Now
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className="block">Welcome back, {user.name}!</span>
                <span className="block text-primary-200">Manage your products or create new ones.</span>
              </h2>
              <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4">
                <div className="inline-flex rounded-md shadow">
                  <Link
                    to="/my-products"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-secondary-50"
                  >
                    My Products
                  </Link>
                </div>
                <div className="inline-flex rounded-md shadow">
                  <Link
                    to="/products/new"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-700 hover:bg-primary-800"
                  >
                    Create Product
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
