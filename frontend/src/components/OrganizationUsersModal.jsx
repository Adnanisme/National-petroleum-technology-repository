import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, UserPlus, Mail, Calendar, Shield, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrganizationUsersModal = ({ isOpen, onClose, organization, onRefresh }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && organization) {
      fetchUsers();
    }
  }, [isOpen, organization]);

  const fetchUsers = async () => {
    if (!organization) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://127.0.0.1:8000/api/organizations/${organization.id}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://127.0.0.1:8000/api/organizations/${organization.id}/users`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        setNewUser({
          name: '',
          email: '',
          password: '',
          role: 'user'
        });
        setShowAddUserForm(false);
        fetchUsers();
        if (onRefresh) onRefresh();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create user');
      }
    } catch (error) {
      setError('Network error occurred');
      console.error('Error creating user:', error);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'super_admin':
        return <Shield className="h-4 w-4 text-red-600" />;
      case 'org_admin':
        return <Settings className="h-4 w-4 text-blue-600" />;
      case 'admin':
        return <Shield className="h-4 w-4 text-purple-600" />;
      case 'contributor':
        return <UserPlus className="h-4 w-4 text-green-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-100 text-red-800';
      case 'org_admin':
        return 'bg-blue-100 text-blue-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'contributor':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatRole = (role) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin';
      case 'org_admin':
        return 'Organization Admin';
      case 'admin':
        return 'Admin';
      case 'contributor':
        return 'Contributor';
      default:
        return 'User';
    }
  };

  if (!organization) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl max-h-[90vh] rounded-lg bg-white shadow-xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    Organization Users
                  </h2>
                  <p className="text-sm text-gray-600">{organization.name} ({organization.short_name})</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={() => setShowAddUserForm(!showAddUserForm)}
                    size="sm"
                    className="flex items-center"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                  <button
                    onClick={onClose}
                    className="rounded-md p-2 hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Add User Form */}
                {showAddUserForm && (
                  <div className="border-b border-gray-200 p-6 bg-gray-50">
                    <h3 className="text-md font-medium text-gray-900 mb-4">Add New User</h3>
                    
                    {error && (
                      <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={newUser.name}
                          onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter user's full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="user@organization.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password *
                        </label>
                        <input
                          type="password"
                          value={newUser.password}
                          onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                          required
                          minLength={8}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter password (min 8 chars)"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Role *
                        </label>
                        <select
                          value={newUser.role}
                          onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="user">User</option>
                          <option value="contributor">Contributor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      
                      <div className="md:col-span-2 flex justify-end space-x-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowAddUserForm(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">
                          Create User
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Users List */}
                <div className="p-6">
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-2 text-gray-600">Loading users...</p>
                    </div>
                  ) : users.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <p>No users found for this organization.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Joined</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <motion.tr
                              key={user.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="border-b border-gray-100 hover:bg-gray-50"
                            >
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                    <span className="text-sm font-medium text-blue-600">
                                      {user.name.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                  <span className="font-medium text-gray-900">{user.name}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  {getRoleIcon(user.role)}
                                  <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(user.role)}`}>
                                    {formatRole(user.role)}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center text-gray-600">
                                  <Mail className="h-4 w-4 mr-2" />
                                  {user.email}
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  {new Date(user.created_at).toLocaleDateString()}
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OrganizationUsersModal;