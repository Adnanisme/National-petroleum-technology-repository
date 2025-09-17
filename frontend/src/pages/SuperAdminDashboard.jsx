import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Plus, 
  Eye, 
  UserPlus, 
  Settings,
  Shield,
  Database,
  FileText,
  Activity,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddOrganizationModal from '@/components/AddOrganizationModal';
import AddAcademicModal from '@/components/AddAcademicModal';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [academics, setAcademics] = useState([]);
  const [activeTab, setActiveTab] = useState('organizations');
  const [stats, setStats] = useState({
    totalOrgs: 0,
    totalUsers: 0,
    totalDocuments: 0,
    activeOrgs: 0,
    totalAcademics: 0,
    activeAcademics: 0
  });
  const [loading, setLoading] = useState(true);
  const [showAddOrgModal, setShowAddOrgModal] = useState(false);
  const [showAddAcademicModal, setShowAddAcademicModal] = useState(false);

  useEffect(() => {
    fetchOrganizations();
    fetchAcademics();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('http://127.0.0.1:8000/api/organizations', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setOrganizations(data);
        
        // Calculate stats
        const totalUsers = data.reduce((sum, org) => sum + (org.users?.length || 0), 0);
        const totalDocuments = data.reduce((sum, org) => sum + (org.documents?.length || 0), 0);
        const activeOrgs = data.filter(org => org.is_active).length;
        
        setStats(prevStats => ({
          ...prevStats,
          totalOrgs: data.length,
          totalUsers,
          totalDocuments,
          activeOrgs
        }));
      }
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  const fetchAcademics = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('http://127.0.0.1:8000/api/academics', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAcademics(data);
        
        const activeAcademics = data.filter(academic => academic.is_active).length;
        
        setStats(prevStats => ({
          ...prevStats,
          totalAcademics: data.length,
          activeAcademics
        }));
      }
    } catch (error) {
      console.error('Error fetching academics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrganization = () => {
    setShowAddOrgModal(true);
  };

  const handleAddAcademic = () => {
    setShowAddAcademicModal(true);
  };


  const handleToggleOrgStatus = async (orgId, currentStatus) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://127.0.0.1:8000/api/organizations/${orgId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_active: !currentStatus })
      });
      
      if (response.ok) {
        fetchOrganizations(); // Refresh data
      }
    } catch (error) {
      console.error('Error toggling organization status:', error);
    }
  };

  const handleToggleAcademicStatus = async (academicId, currentStatus) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://127.0.0.1:8000/api/academics/${academicId}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        fetchAcademics(); // Refresh data
      }
    } catch (error) {
      console.error('Error toggling academic status:', error);
    }
  };

  const getOrgTypeColor = (type) => {
    const colors = {
      'government': 'bg-blue-100 text-blue-800',
      'private': 'bg-green-100 text-green-800',
      'academic': 'bg-purple-100 text-purple-800',
      'research': 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
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
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            Super Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Manage organizations and system administration</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Organizations</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrgs}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Organizations</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeOrgs}</p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
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
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Academics</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalAcademics}</p>
                </div>
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Academics</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeAcademics}</p>
                </div>
                <ShieldCheck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('organizations')}
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'organizations'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Building2 className="h-4 w-4 inline-block mr-2" />
              Organizations
            </button>
            <button
              onClick={() => setActiveTab('academics')}
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'academics'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="h-4 w-4 inline-block mr-2" />
              Academics
            </button>
          </div>
        </div>

        {/* Organizations Management */}
        {activeTab === 'organizations' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Organization Management
              </CardTitle>
              <Button onClick={handleAddOrganization} className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Organization
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Organization</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Users</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Documents</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {organizations.map((org) => (
                    <motion.tr
                      key={org.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <div 
                          className="cursor-pointer"
                          onClick={() => navigate(`/super-admin/organization/${org.id}`)}
                        >
                          <p className="font-medium text-blue-600 hover:text-blue-800">{org.name}</p>
                          <p className="text-sm text-gray-500">{org.short_name}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getOrgTypeColor(org.type)}`}>
                          {org.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-900">
                        {org.users?.length || 0}
                      </td>
                      <td className="py-4 px-4 text-gray-900">
                        {org.documents?.length || 0}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleToggleOrgStatus(org.id, org.is_active)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                              org.is_active ? 'bg-green-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                org.is_active ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                          <span className={`ml-2 text-sm ${org.is_active ? 'text-green-600' : 'text-gray-500'}`}>
                            {org.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/super-admin/organization/${org.id}`)}
                          className="flex items-center"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              
              {organizations.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No organizations found. Create your first organization to get started.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        )}

        {/* Academics Management */}
        {activeTab === 'academics' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Academic Management
              </CardTitle>
              <Button onClick={handleAddAcademic} className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Academic
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Academic</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Institution</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Specialization</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Reviews</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {academics.map((academic) => (
                    <motion.tr
                      key={academic.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{academic.name}</p>
                          <p className="text-sm text-gray-500">{academic.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-900">
                        {academic.institution || 'Not specified'}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          academic.specialization ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {academic.specialization || 'Not specified'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <div className="text-green-600">Approved: {academic.total_approvals || 0}</div>
                          <div className="text-red-600">Rejected: {academic.total_rejections || 0}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleToggleAcademicStatus(academic.id, academic.is_active)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                              academic.is_active ? 'bg-green-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                academic.is_active ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                          <span className={`ml-2 text-sm ${academic.is_active ? 'text-green-600' : 'text-gray-500'}`}>
                            {academic.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/super-admin/academic/${academic.id}`)}
                          className="flex items-center"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              
              {academics.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No academics found. Add your first academic to get started.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        )}
      </div>

      {/* Modals */}
      <AddOrganizationModal
        isOpen={showAddOrgModal}
        onClose={() => setShowAddOrgModal(false)}
        onSuccess={fetchOrganizations}
      />
      <AddAcademicModal
        isOpen={showAddAcademicModal}
        onClose={() => setShowAddAcademicModal(false)}
        onSuccess={fetchAcademics}
      />
    </div>
  );
};

export default SuperAdminDashboard;