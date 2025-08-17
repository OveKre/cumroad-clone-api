import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../contexts/AuthContext';
import { useProduct, useUpdateProduct } from '../hooks/useProducts';
import { updateProductSchema } from '../lib/validation';
import type { UpdateProductFormData } from '../lib/validation';
import { LoadingPage } from '../components/LoadingSpinner';
import { ErrorMessage, SuccessMessage } from '../components/Messages';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ApiError } from '../lib/api';
import { ArrowLeft, Package, DollarSign, FileText, Image, Save } from 'lucide-react';
import type { Product } from '../lib/types';

export function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const productId = parseInt(id || '0', 10);
  
  const { data: product, isLoading: productLoading, error: productError } = useProduct(productId);
  const updateProductMutation = useUpdateProduct(productId);
  
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductSchema),
  });

  const watchedPrice = watch('price');

  // Load product data into form when product is fetched
  useEffect(() => {
    if (product) {
      const typedProduct = product as Product;
      
      // Check if user owns this product
      if (typedProduct.userId !== user?.id && user?.role !== 'admin') {
        navigate('/my-products');
        return;
      }

      reset({
        name: typedProduct.name,
        description: typedProduct.description || '',
        price: typedProduct.price,
        imageUrl: typedProduct.imageUrl || '',
      });
    }
  }, [product, reset, user, navigate]);

  const onSubmit = async (data: UpdateProductFormData) => {
    try {
      setError('');
      setSuccess('');
      
      // Remove empty fields
      const updateData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== '' && value !== undefined)
      );
      
      await updateProductMutation.mutateAsync(updateData);
      
      setSuccess('Product updated successfully!');
      setTimeout(() => {
        navigate('/my-products');
      }, 2000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  if (productLoading) {
    return <LoadingPage message="Loading product..." />;
  }

  if (productError || !product) {
    return (
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <ErrorMessage message="Product not found or failed to load." />
          <div className="mt-6">
            <Link to="/my-products" className="btn-secondary">
              ← Back to My Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const typedProduct = product as Product;

  // Check permissions
  if (typedProduct.userId !== user?.id && user?.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <ErrorMessage message="You don't have permission to edit this product." />
          <div className="mt-6">
            <Link to="/my-products" className="btn-secondary">
              ← Back to My Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/my-products"
            className="flex items-center text-secondary-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Products
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Package className="h-8 w-8 text-primary-600 mr-3" />
            <h1 className="text-3xl font-bold text-secondary-900">Edit Product</h1>
          </div>
          <p className="text-secondary-600">
            Update your product details. Changes will be visible to customers immediately.
          </p>
        </div>

        {/* Form */}
        <div className="card max-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Messages */}
            {error && (
              <ErrorMessage
                message={error}
                onClose={() => setError('')}
              />
            )}

            {success && (
              <SuccessMessage
                message={success}
                onClose={() => setSuccess('')}
              />
            )}

            {/* Product Name */}
            <div>
              <label htmlFor="name" className="flex items-center text-sm font-medium text-secondary-700 mb-2">
                <FileText className="h-4 w-4 mr-2" />
                Product Name
              </label>
              <input
                {...register('name')}
                type="text"
                className="input-field"
                placeholder="Enter your product name"
              />
              {errors.name && (
                <p className="error-text">{errors.name.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="flex items-center text-sm font-medium text-secondary-700 mb-2">
                <FileText className="h-4 w-4 mr-2" />
                Description
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="input-field resize-none"
                placeholder="Describe your product"
              />
              {errors.description && (
                <p className="error-text">{errors.description.message}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="flex items-center text-sm font-medium text-secondary-700 mb-2">
                <DollarSign className="h-4 w-4 mr-2" />
                Price (USD)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-secondary-500 sm:text-sm">$</span>
                </div>
                <input
                  {...register('price', { 
                    valueAsNumber: true,
                    setValueAs: (value) => value === '' ? undefined : parseFloat(value) || 0 
                  })}
                  type="number"
                  step="0.01"
                  min="0"
                  className="input-field pl-7"
                  placeholder="0.00"
                />
              </div>
              {errors.price && (
                <p className="error-text">{errors.price.message}</p>
              )}
              {watchedPrice !== undefined && watchedPrice > 0 && (
                <p className="text-xs text-secondary-500 mt-1">
                  New price: ${watchedPrice.toFixed(2)}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="flex items-center text-sm font-medium text-secondary-700 mb-2">
                <Image className="h-4 w-4 mr-2" />
                Product Image URL
              </label>
              <input
                {...register('imageUrl')}
                type="url"
                className="input-field"
                placeholder="https://example.com/your-image.jpg"
              />
              {errors.imageUrl && (
                <p className="error-text">{errors.imageUrl.message}</p>
              )}
            </div>

            {/* Current Product Info */}
            <div className="bg-secondary-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-secondary-900 mb-2">Current Product</h3>
              <div className="text-sm text-secondary-600 space-y-1">
                <p><strong>Name:</strong> {typedProduct.name}</p>
                <p><strong>Current Price:</strong> ${typedProduct.price.toFixed(2)}</p>
                <p><strong>Last Updated:</strong> {new Date(typedProduct.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-secondary-200">
              <button
                type="submit"
                disabled={updateProductMutation.isPending}
                className="flex-1 flex items-center justify-center space-x-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateProductMutation.isPending ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>
                  {updateProductMutation.isPending ? 'Saving...' : 'Save Changes'}
                </span>
              </button>
              
              <Link
                to="/my-products"
                className="flex-1 btn-secondary text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
