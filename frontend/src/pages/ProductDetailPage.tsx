import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCreateOrder } from '../hooks/useOrders';
import { useAuth } from '../contexts/AuthContext';
import { LoadingPage } from '../components/LoadingSpinner';
import { ErrorMessage, SuccessMessage } from '../components/Messages';
import { Package, ShoppingCart, Calendar, User, ArrowLeft } from 'lucide-react';
import type { Product } from '../lib/types';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const productId = parseInt(id || '0', 10);
  
  const { data: product, isLoading, error } = useProduct(productId);
  const createOrderMutation = useCreateOrder();
  
  const [quantity, setQuantity] = useState(1);
  const [orderError, setOrderError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState('');

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/products/${productId}` } } });
      return;
    }

    try {
      setOrderError('');
      setOrderSuccess('');
      
      await createOrderMutation.mutateAsync({
        productId,
        quantity,
      });
      
      setOrderSuccess('Order created successfully! Check your orders page.');
    } catch (err: any) {
      setOrderError(err.message || 'Failed to create order. Please try again.');
    }
  };

  if (isLoading) {
    return <LoadingPage message="Loading product..." />;
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <ErrorMessage message="Product not found or failed to load." />
          <div className="mt-6">
            <Link to="/products" className="btn-secondary">
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const typedProduct = product as Product;
  const totalPrice = typedProduct.price * quantity;
  const isOwnProduct = user?.id === typedProduct.userId;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/products"
            className="flex items-center text-secondary-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-9">
              {typedProduct.imageUrl ? (
                <img
                  src={typedProduct.imageUrl}
                  alt={typedProduct.name}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/600x400?text=No+Image';
                  }}
                />
              ) : (
                <div className="w-full h-96 bg-secondary-200 rounded-lg flex items-center justify-center shadow-lg">
                  <Package className="h-24 w-24 text-secondary-400" />
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 mb-4">
                {typedProduct.name}
              </h1>
              
              <div className="flex items-center space-x-4 text-sm text-secondary-600 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Created {new Date(typedProduct.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>Seller ID: {typedProduct.userId}</span>
                </div>
              </div>

              {typedProduct.description && (
                <div className="prose prose-secondary max-w-none">
                  <p className="text-secondary-700 leading-relaxed">
                    {typedProduct.description}
                  </p>
                </div>
              )}
            </div>

            {/* Price and Purchase */}
            <div className="border-t border-secondary-200 pt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-3xl font-bold text-primary-600">
                    ${typedProduct.price.toFixed(2)}
                  </span>
                  <span className="text-secondary-600 ml-2">per item</span>
                </div>
              </div>

              {/* Messages */}
              {orderError && (
                <ErrorMessage
                  message={orderError}
                  onClose={() => setOrderError('')}
                  className="mb-4"
                />
              )}

              {orderSuccess && (
                <SuccessMessage
                  message={orderSuccess}
                  onClose={() => setOrderSuccess('')}
                  className="mb-4"
                />
              )}

              {isOwnProduct ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm">
                      This is your product. You can edit it from your dashboard.
                    </p>
                  </div>
                  <Link
                    to={`/products/${typedProduct.id}/edit`}
                    className="btn-primary w-full block text-center"
                  >
                    Edit Product
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Quantity Selector */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="btn-secondary px-3 py-1"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-lg font-medium w-12 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="btn-secondary px-3 py-1"
                        disabled={quantity >= 100}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="bg-secondary-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-700">Total:</span>
                      <span className="text-2xl font-bold text-primary-600">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Purchase Button */}
                  <button
                    onClick={handlePurchase}
                    disabled={createOrderMutation.isPending}
                    className="w-full flex items-center justify-center space-x-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>
                      {createOrderMutation.isPending ? 'Processing...' : 'Purchase Now'}
                    </span>
                  </button>

                  {!isAuthenticated && (
                    <p className="text-sm text-secondary-600 text-center">
                      <Link to="/login" className="text-primary-600 hover:text-primary-500">
                        Sign in
                      </Link>{' '}
                      to purchase this product
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="border-t border-secondary-200 pt-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Product Information
              </h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-secondary-600">Product ID:</dt>
                  <dd className="text-secondary-900 font-medium">{typedProduct.id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-secondary-600">Category:</dt>
                  <dd className="text-secondary-900 font-medium">Digital Product</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-secondary-600">Last Updated:</dt>
                  <dd className="text-secondary-900 font-medium">
                    {new Date(typedProduct.updatedAt).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
