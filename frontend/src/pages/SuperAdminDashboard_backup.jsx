import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('SuperAdminDashboard mounted');
    
    // Simple test to see if component loads
    setTimeout(() => {
      setLoading(false);
      console.log('Loading complete');
    }, 1000);
  }, []);

  console.log('SuperAdminDashboard rendering, loading:', loading);

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
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Super Admin Dashboard - TEST
          </h1>
          <p className="text-gray-600 mt-2">This is a test version to debug the issue</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <p>If you can see this, the component is working!</p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;