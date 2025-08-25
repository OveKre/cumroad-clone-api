import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiService } from '../lib/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage, SuccessMessage } from '../components/Messages';
import { FiUser, FiArrowLeft, FiSave } from 'react-icons/fi';

const updateUserSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  name: z.string().optional(),
});

type UpdateUserFormData = z.infer<typeof updateUserSchema>;

interface User {
  id: number;
  email: string;
  name?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export function UserEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    if (id) {
      fetchUser(parseInt(id));
    }
  }, [id]);

  const fetchUser = async (userId: number) => {
    try {
      setLoading(true);
      setError('');
      const userData = await apiService.getUser(userId);
      const user = userData as User;
      setUser(user);
      
      // Set form values
      setValue('email', user.email);
      setValue('name', user.name || '');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: UpdateUserFormData) => {
    if (!user) return;

    try {
      setIsSubmitting(true);
      setError('');
      
      const updateData = {
        email: data.email,
        name: data.name || undefined,
      };
      
      const updatedUser = await apiService.updateUser(user.id, updateData);
      setUser(updatedUser as User);
      setSuccess('User updated successfully');
      
      setTimeout(() => {
        navigate(`/users/${user.id}`);
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-secondary-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorMessage message={error} />
          <div className="mt-4">
            <Link
              to="/users"
              className="text-primary-600 hover:text-primary-500"
            >
              ← Back to users
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-secondary-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-secondary-500">User not found</p>
            <Link
              to="/users"
              className="text-primary-600 hover:text-primary-500 mt-2 inline-block"
            >
              ← Back to users
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            to={`/users/${user.id}`}
            className="inline-flex items-center text-primary-600 hover:text-primary-500 mb-4"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Back to user details
          </Link>
          <h1 className="text-3xl font-bold text-secondary-900">Edit User</h1>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onClose={() => setError('')} />
          </div>
        )}

        {success && (
          <div className="mb-6">
            <SuccessMessage message={success} onClose={() => setSuccess('')} />
          </div>
        )}

        {/* Edit Form */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-secondary-200">
            <div className="flex items-center">
              <FiUser className="h-6 w-6 text-primary-600 mr-3" />
              <h2 className="text-xl font-bold text-secondary-900">
                Edit User: {user.name || user.email}
              </h2>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700">
                Email Address *
              </label>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                className="mt-1 input-field"
                placeholder="Enter email address"
                data-testid="edit-user-email"
              />
              {errors.email && (
                <p className="error-text" data-testid="email-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-secondary-700">
                Full Name
              </label>
              <input
                {...register('name')}
                type="text"
                autoComplete="name"
                className="mt-1 input-field"
                placeholder="Enter full name (optional)"
                data-testid="edit-user-name"
              />
              {errors.name && (
                <p className="error-text" data-testid="name-error">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* User Info */}
            <div className="bg-secondary-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-secondary-900 mb-2">User Information</h3>
              <div className="grid grid-cols-1 gap-2 text-sm text-secondary-600">
                <div>
                  <span className="font-medium">User ID:</span> {user.id}
                </div>
                <div>
                  <span className="font-medium">Role:</span> {user.role}
                </div>
                <div>
                  <span className="font-medium">Created:</span> {new Date(user.createdAt).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span> {new Date(user.updatedAt).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-secondary-200">
              <Link
                to={`/users/${user.id}`}
                className="px-4 py-2 border border-secondary-300 text-sm font-medium rounded-md text-secondary-700 bg-white hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="save-user-button"
              >
                {isSubmitting ? (
                  <LoadingSpinner size="sm" className="mr-2" />
                ) : (
                  <FiSave className="h-4 w-4 mr-2" />
                )}
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
