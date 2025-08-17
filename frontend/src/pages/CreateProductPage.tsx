import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateProduct } from '../hooks/useProducts';
import { createProductSchema } from '../lib/validation';
import type { CreateProductFormData } from '../lib/validation';
import { ErrorMessage, SuccessMessage } from '../components/Messages';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ApiError } from '../lib/api';
import { ArrowLeft, Package, DollarSign, FileText, Image } from 'lucide-react';

export function CreateProductPage() {
  const navigate = useNavigate();
  const createProductMutation = useCreateProduct();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
    },
  });

  const watchedPrice = watch('price');

  const onSubmit = async (data: CreateProductFormData) => {
    try {
      setError('');
      setSuccess('');
      
      const result = await createProductMutation.mutateAsync(data);
      
      setSuccess('Product created successfully! Redirecting...');
      setTimeout(() => {
        navigate(`/products/${(result as any)?.id || ''}`);
      }, 2000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/dashboard"
            className="flex items-center text-secondary-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Package className="h-8 w-8 text-primary-600 mr-3" />
            <h1 className="text-3xl font-bold text-secondary-900">Create New Product</h1>
          </div>
          <p className="text-secondary-600">
            Add a new digital product to your store. Fill in the details below to get started.
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
                Product Name *
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
                placeholder="Describe your product (optional)"
              />
              {errors.description && (
                <p className="error-text">{errors.description.message}</p>
              )}
              <p className="text-xs text-secondary-500 mt-1">
                A good description helps buyers understand what they're purchasing.
              </p>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="flex items-center text-sm font-medium text-secondary-700 mb-2">
                <DollarSign className="h-4 w-4 mr-2" />
                Price * (USD)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-secondary-500 sm:text-sm">$</span>
                </div>
                <input
                  {...register('price', { 
                    valueAsNumber: true,
                    setValueAs: (value) => parseFloat(value) || 0 
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
              {watchedPrice > 0 && (
                <p className="text-xs text-secondary-500 mt-1">
                  Customers will pay ${watchedPrice.toFixed(2)} for this product.
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
              <p className="text-xs text-secondary-500 mt-1">
                Optional: Add an image URL to showcase your product. Leave empty if you don't have an image.
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-secondary-200">
              <button
                type="submit"
                disabled={createProductMutation.isPending}
                className="flex-1 flex items-center justify-center space-x-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createProductMutation.isPending ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Package className="h-4 w-4" />
                )}
                <span>
                  {createProductMutation.isPending ? 'Creating...' : 'Create Product'}
                </span>
              </button>
              
              <Link
                to="/dashboard"
                className="flex-1 btn-secondary text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-12 card bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            💡 Tips for Creating Great Products
          </h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• <strong>Clear Name:</strong> Choose a descriptive name that explains what your product is</li>
            <li>• <strong>Detailed Description:</strong> Explain what buyers will get and how it helps them</li>
            <li>• <strong>Fair Pricing:</strong> Research similar products to set a competitive price</li>
            <li>• <strong>Quality Image:</strong> Use a high-quality image that represents your product well</li>
            <li>• <strong>Value Proposition:</strong> Clearly communicate the value and benefits</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
