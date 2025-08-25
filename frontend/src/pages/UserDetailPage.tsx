import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiService } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage, SuccessMessage } from '../components/Messages';
import { FiUser, FiMail, FiCalendar, FiEdit2, FiTrash2, FiArrowLeft } from 'react-icons/fi';

interface User {
  id: number;
  email: string;
  name?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      setUser(userData as User);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!user || !confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      setError('');
      await apiService.deleteUser(user.id);
      setSuccess('User deleted successfully');
      setTimeout(() => {
        navigate('/users');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to delete user');
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
            to="/users"
            className="inline-flex items-center text-primary-600 hover:text-primary-500 mb-4"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Back to users
          </Link>
          <h1 className="text-3xl font-bold text-secondary-900">User Details</h1>
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

        {/* User Details Card */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-secondary-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-16 w-16">
                  <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                    <FiUser className="h-8 w-8 text-primary-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-secondary-900" data-testid="user-detail-name">
                    {user.name || 'No name'}
                  </h2>
                  <p className="text-secondary-500" data-testid="user-detail-email">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                  user.role === 'admin' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`} data-testid="user-detail-role">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          <div className="px-6 py-4">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-secondary-500 flex items-center">
                  <FiUser className="h-4 w-4 mr-2" />
                  User ID
                </dt>
                <dd className="mt-1 text-sm text-secondary-900" data-testid="user-detail-id">
                  {user.id}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-secondary-500 flex items-center">
                  <FiMail className="h-4 w-4 mr-2" />
                  Email Address
                </dt>
                <dd className="mt-1 text-sm text-secondary-900">
                  <a href={`mailto:${user.email}`} className="text-primary-600 hover:text-primary-500">
                    {user.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-secondary-500 flex items-center">
                  <FiCalendar className="h-4 w-4 mr-2" />
                  Created At
                </dt>
                <dd className="mt-1 text-sm text-secondary-900" data-testid="user-detail-created">
                  {new Date(user.createdAt).toLocaleString()}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-secondary-500 flex items-center">
                  <FiCalendar className="h-4 w-4 mr-2" />
                  Last Updated
                </dt>
                <dd className="mt-1 text-sm text-secondary-900" data-testid="user-detail-updated">
                  {new Date(user.updatedAt).toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 border-t border-secondary-200 bg-secondary-50">
            <div className="flex items-center justify-end space-x-3">
              <Link
                to={`/users/${user.id}/edit`}
                className="inline-flex items-center px-4 py-2 border border-secondary-300 text-sm font-medium rounded-md text-secondary-700 bg-white hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                data-testid="edit-user-button"
              >
                <FiEdit2 className="h-4 w-4 mr-2" />
                Edit User
              </Link>
              
              {currentUser?.id !== user.id && (
                <button
                  onClick={handleDeleteUser}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  data-testid="delete-user-button"
                >
                  <FiTrash2 className="h-4 w-4 mr-2" />
                  Delete User
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
