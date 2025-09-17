import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Plus, 
  Eye, 
  Shield,
  Database,
  FileText,
  Activity,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('SuperAdminDashboard mounted');
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log('Starting to fetch data...');
      await Promise.all([fetchOrganizations(), fetchAcademics()]);
      console.log('Data fetching completed');
    } catch (error) {
      console.error('Error in fetchData:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrganizations = async () => {
    try {
      console.log('Fetching organizations...');
      const token = localStorage.getItem('auth_token');
      console.log('Token available:', !!token);
      
      const response = await fetch('http://127.0.0.1:8000/api/organizations', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      console.log('Organizations response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Organizations data:', data);
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
      } else {
        const errorText = await response.text();
        console.error('Organizations fetch failed:', response.status, errorText);
        throw new Error(`Failed to fetch organizations: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching organizations:', error);
      throw error;
    }
  };

  const fetchAcademics = async () => {
    try {
      console.log('Fetching academics...');
      const token = localStorage.getItem('auth_token');
      const response = await fetch('http://127.0.0.1:8000/api/academics', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      console.log('Academics response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Academics data:', data);
        setAcademics(data);
        
        const activeAcademics = data.filter(academic => academic.is_active).length;
        
        setStats(prevStats => ({
          ...prevStats,
          totalAcademics: data.length,
          activeAcademics
        }));
      } else {
        const errorText = await response.text();
        console.error('Academics fetch failed:', response.status, errorText);
        // Don't throw error for academics as it's new - just log it
      }
    } catch (error) {
      console.error('Error fetching academics:', error);
      // Don't throw error for academics as it's new - just log it
    }
  };

  console.log('Rendering with state:', { loading, error, organizations: organizations.length, academics: academics.length });

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

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Dashboard Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Reload Page
          </Button>
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
            Super Admin Dashboard (Debug Version)
          </h1>
          <p className="text-gray-600 mt-2">Manage organizations and system administration</p>
        </div>

        {/* Debug Info */}
        <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-medium text-yellow-800">Debug Info:</h3>
          <p className="text-sm text-yellow-700">Organizations: {organizations.length}</p>
          <p className="text-sm text-yellow-700">Academics: {academics.length}</p>
          <p className="text-sm text-yellow-700">Active Tab: {activeTab}</p>
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

        {/* Simple content */}
        <Card>
          <CardHeader>
            <CardTitle>Organizations & Academics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Organizations loaded: {organizations.length}</p>
            <p>Academics loaded: {academics.length}</p>
            <p>If you can see this, the component is rendering successfully!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;