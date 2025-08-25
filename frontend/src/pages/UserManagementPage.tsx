import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage, SuccessMessage } from '../components/Messages';
import { FiEdit2, FiTrash2, FiUser, FiPlus, FiSearch } from 'react-icons/fi';

interface User {
  id: number;
  email: string;
  name?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export function UserManagementPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const usersData = await apiService.getAllUsers();
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      setError('');
      await apiService.deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
      setSuccess('User deleted successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-secondary-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiUser className="h-6 w-6 text-primary-600 mr-3" />
                <h1 className="text-2xl font-bold text-secondary-900">User Management</h1>
              </div>
              <Link
                to="/users/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                data-testid="create-user-button"
              >
                <FiPlus className="h-4 w-4 mr-2" />
                Add User
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="px-6 py-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-secondary-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-secondary-300 rounded-md leading-5 bg-white placeholder-secondary-500 focus:outline-none focus:placeholder-secondary-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search users by email or name..."
                data-testid="search-users"
              />
            </div>
          </div>
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

        {/* Users Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-secondary-500">
                      {searchQuery ? 'No users found matching your search.' : 'No users found.'}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-secondary-50" data-testid={`user-row-${user.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                              <FiUser className="h-5 w-5 text-primary-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-secondary-900" data-testid={`user-name-${user.id}`}>
                              {user.name || 'No name'}
                            </div>
                            <div className="text-sm text-secondary-500" data-testid={`user-email-${user.id}`}>
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`} data-testid={`user-role-${user.id}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/users/${user.id}`}
                            className="text-primary-600 hover:text-primary-900"
                            data-testid={`view-user-${user.id}`}
                          >
                            View
                          </Link>
                          <Link
                            to={`/users/${user.id}/edit`}
                            className="text-primary-600 hover:text-primary-900"
                            data-testid={`edit-user-${user.id}`}
                          >
                            <FiEdit2 className="h-4 w-4" />
                          </Link>
                          {currentUser?.id !== user.id && (
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-900"
                              data-testid={`delete-user-${user.id}`}
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{users.length}</div>
              <div className="text-sm text-secondary-500">Total Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {users.filter(u => u.role === 'user').length}
              </div>
              <div className="text-sm text-secondary-500">Regular Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {users.filter(u => u.role === 'admin').length}
              </div>
              <div className="text-sm text-secondary-500">Administrators</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
