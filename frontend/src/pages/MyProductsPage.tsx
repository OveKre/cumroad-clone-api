import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProducts, useDeleteProduct } from '../hooks/useProducts';
import { LoadingPage } from '../components/LoadingSpinner';
import { ErrorMessage, SuccessMessage } from '../components/Messages';
import { Package, Plus, Edit, Trash2, Eye } from 'lucide-react';
import type { Product } from '../lib/types';

export function MyProductsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: allProducts, isLoading, error } = useProducts();
  const deleteProductMutation = useDeleteProduct();
  
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Filter products to show only user's products
  const myProducts = (allProducts as Product[] || []).filter(
    product => product.userId === user?.id
  );

  const handleDelete = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(productId);
      setDeleteError('');
      setDeleteSuccess('');
      
      await deleteProductMutation.mutateAsync(productId);
      setDeleteSuccess('Product deleted successfully!');
    } catch (error: any) {
      setDeleteError(error.message || 'Failed to delete product');
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return <LoadingPage message="Loading your products..." />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <ErrorMessage message="Failed to load your products. Please try again later." />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">My Products</h1>
            <p className="mt-2 text-secondary-600">
              Manage your digital products and track their performance
            </p>
          </div>
          <Link
            to="/products/new"
            className="flex items-center space-x-2 btn-primary"
          >
            <Plus className="h-4 w-4" />
            <span>Create Product</span>
          </Link>
        </div>

        {/* Messages */}
        {deleteError && (
          <ErrorMessage
            message={deleteError}
            onClose={() => setDeleteError('')}
            className="mb-6"
          />
        )}

        {deleteSuccess && (
          <SuccessMessage
            message={deleteSuccess}
            onClose={() => setDeleteSuccess('')}
            className="mb-6"
          />
        )}

        {/* Products List */}
        {myProducts.length > 0 ? (
          <div className="space-y-6">
            {myProducts.map((product) => (
              <div key={product.id} className="card hover:shadow-lg transition-shadow duration-200">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Product Image */}
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

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-secondary-600 mb-3 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-4 text-sm text-secondary-500">
                          <span>Created: {new Date(product.createdAt).toLocaleDateString()}</span>
                          <span>Updated: {new Date(product.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end ml-4">
                        <span className="text-2xl font-bold text-primary-600 mb-4">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-secondary-200">
                      <Link
                        to={`/products/${product.id}`}
                        className="flex items-center space-x-1 btn-secondary text-sm"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </Link>
                      
                      <Link
                        to={`/products/${product.id}/edit`}
                        className="flex items-center space-x-1 btn-outline text-sm"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </Link>
                      
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deletingId === product.id}
                        className="flex items-center space-x-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>
                          {deletingId === product.id ? 'Deleting...' : 'Delete'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">
              No products yet
            </h3>
            <p className="text-secondary-600 mb-6">
              Start by creating your first digital product to sell on the marketplace.
            </p>
            <Link to="/products/new" className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Product
            </Link>
          </div>
        )}

        {/* Stats Section */}
        {myProducts.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {myProducts.length}
              </div>
              <div className="text-secondary-600">Total Products</div>
            </div>
            
            <div className="card text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                ${myProducts.reduce((sum, product) => sum + product.price, 0).toFixed(2)}
              </div>
              <div className="text-secondary-600">Total Value</div>
            </div>
            
            <div className="card text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                ${(myProducts.reduce((sum, product) => sum + product.price, 0) / myProducts.length).toFixed(2)}
              </div>
              <div className="text-secondary-600">Average Price</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
