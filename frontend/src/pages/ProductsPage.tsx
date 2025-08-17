import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/Messages';
import { Package, Search, Filter, Grid, List } from 'lucide-react';
import type { Product } from '../lib/types';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

function ProductCard({ product, viewMode }: ProductCardProps) {
  if (viewMode === 'list') {
    return (
      <div className="card hover:shadow-lg transition-shadow duration-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full sm:w-32 h-32 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
            ) : (
              <div className="w-full sm:w-32 h-32 bg-secondary-200 rounded-lg flex items-center justify-center">
                <Package className="h-8 w-8 text-secondary-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-secondary-900 truncate">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-secondary-600 text-sm mt-1 line-clamp-2">
                    {product.description}
                  </p>
                )}
                <p className="text-xs text-secondary-500 mt-2">
                  Created: {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex flex-col items-end ml-4">
                <span className="text-2xl font-bold text-primary-600">
                  ${product.price.toFixed(2)}
                </span>
                <Link
                  to={`/products/${product.id}`}
                  className="btn-primary text-sm mt-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="card hover:shadow-lg transition-shadow duration-200 block"
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
            <Package className="h-12 w-12 text-secondary-400" />
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
        <span className="btn-primary text-sm">
          View Details
        </span>
      </div>
    </Link>
  );
}

export function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const filteredProducts = (products as Product[] || []).filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    
    const matchesPrice = (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
                        (!priceRange.max || product.price <= parseFloat(priceRange.max));
    
    return matchesSearch && matchesPrice;
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <ErrorMessage message="Failed to load products. Please try again later." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">All Products</h1>
          <p className="mt-2 text-secondary-600">
            Discover digital products from creators around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary-100 text-primary-600'
                    : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary-100 text-primary-600'
                    : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 btn-secondary"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="card">
              <h3 className="text-lg font-medium text-secondary-900 mb-4">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Min Price
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    className="input-field"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Max Price
                  </label>
                  <input
                    type="number"
                    placeholder="999.99"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="input-field"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => setPriceRange({ min: '', max: '' })}
                    className="btn-secondary w-full"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-secondary-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">
              No products found
            </h3>
            <p className="text-secondary-600 mb-6">
              {searchTerm || priceRange.min || priceRange.max
                ? "Try adjusting your search criteria or filters."
                : "No products have been created yet."}
            </p>
            {!searchTerm && !priceRange.min && !priceRange.max && (
              <Link to="/products/new" className="btn-primary">
                Create First Product
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
