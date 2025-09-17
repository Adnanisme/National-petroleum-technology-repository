import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  FileText, 
  Building2, 
  Settings,
  Eye,
  Activity,
  Plus,
  Mail,
  Calendar,
  Shield,
  User,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import AddUserModal from '@/components/AddUserModal';

const OrgAdminDashboard = () => {
  const { user } = useAuth();
  const [organization, setOrganization] = useState(null);
  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalDocuments: 0,
    recentUploads: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  useEffect(() => {
    if (user?.organization_id) {
      fetchOrganizationData();
      fetchUsers();
      fetchDocuments();
    }
  }, [user]);

  const fetchOrganizationData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://127.0.0.1:8000/api/organizations/${user.organization_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setOrganization(data);
      }
    } catch (error) {
      console.error('Error fetching organization:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://127.0.0.1:8000/api/organizations/${user.organization_id}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        
        const activeUsers = data.filter(u => u.is_active).length;
        setStats(prev => ({
          ...prev,
          totalUsers: data.length,
          activeUsers
        }));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://127.0.0.1:8000/api/documents?organization_id=${user.organization_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const docs = data.data || [];
        setDocuments(docs);
        
        // Calculate recent uploads (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentUploads = docs.filter(doc => 
          new Date(doc.created_at) > thirtyDaysAgo
        ).length;
        
        setStats(prev => ({
          ...prev,
          totalDocuments: docs.length,
          recentUploads
        }));
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_active: !currentStatus })
      });
      
      if (response.ok) {
        fetchUsers(); // Refresh users list
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Building2 className="h-8 w-8 text-blue-600 mr-3" />
            Organization Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            {organization?.name} ({organization?.short_name})
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeUsers}</p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Documents</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalDocuments}</p>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Recent Uploads</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.recentUploads}</p>
                </div>
                <Download className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Manage Users
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'documents'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Document Tracking
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Organization Info */}
            <Card>
              <CardHeader>
                <CardTitle>Organization Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Name</p>
                    <p className="text-gray-900">{organization?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Type</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      organization?.type === 'government' ? 'bg-blue-100 text-blue-800' :
                      organization?.type === 'private' ? 'bg-green-100 text-green-800' :
                      organization?.type === 'academic' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {organization?.type}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Description</p>
                    <p className="text-gray-900">{organization?.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Document Uploads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.slice(0, 5).map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium text-gray-900">{doc.title}</p>
                        <p className="text-sm text-gray-600">by {doc.uploader?.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(doc.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {documents.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No documents uploaded yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'users' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  User Management
                </CardTitle>
                <Button onClick={() => setShowAddUserModal(true)} className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
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
                          <div className="flex items-center">
                            <button
                              onClick={() => handleToggleUserStatus(user.id, user.is_active)}
                              disabled={user.role === 'org_admin'} // Don't allow disabling org admin
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                user.is_active ? 'bg-green-600' : 'bg-gray-200'
                              } ${user.role === 'org_admin' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  user.is_active ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                            <span className={`ml-2 text-sm ${user.is_active ? 'text-green-600' : 'text-gray-500'}`}>
                              {user.is_active ? 'Active' : 'Inactive'}
                            </span>
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
                
                {users.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No users found. Create your first user to get started.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'documents' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Document Tracking & Accountability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Document</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Uploaded By</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Upload Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <motion.tr
                        key={doc.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{doc.title}</p>
                            <p className="text-sm text-gray-500">{doc.file_name}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                              <span className="text-xs font-medium text-blue-600">
                                {doc.uploader?.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-gray-900">{doc.uploader?.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {doc.category}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                            doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {new Date(doc.created_at).toLocaleDateString()}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
                
                {documents.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <p>No documents uploaded yet.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        organizationId={user?.organization_id}
        onSuccess={() => {
          fetchUsers();
          setShowAddUserModal(false);
        }}
      />
    </div>
  );
};

export default OrgAdminDashboard;