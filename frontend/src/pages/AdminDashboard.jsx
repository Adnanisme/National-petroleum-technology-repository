import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { admin } from '../lib/api';
import { 
  ShieldCheck, 
  FileText, 
  Database, 
  Lightbulb, 
  Building2,
  Filter,
  Eye,
  Check,
  X,
  Download,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [pendingDocs, setPendingDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredDocs, setFilteredDocs] = useState([]);

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  // Document categories with icons
  const documentCategories = [
    { id: 'All', name: 'All Categories', icon: <Filter className="h-5 w-5" />, count: 0 },
    { id: 'research', name: 'Research Papers', icon: <FileText className="h-5 w-5" />, count: 0 },
    { id: 'dataset', name: 'Datasets', icon: <Database className="h-5 w-5" />, count: 0 },
    { id: 'innovation', name: 'Innovation Projects', icon: <Lightbulb className="h-5 w-5" />, count: 0 },
    { id: 'policy', name: 'Policy Documents', icon: <Building2 className="h-5 w-5" />, count: 0 }
  ];

  // Fetch pending documents
  const fetchPendingDocuments = async () => {
    try {
      setLoading(true);
      const response = await admin.getPendingDocuments();
      setPendingDocs(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch pending documents');
      console.error('Error fetching pending documents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingDocuments();
  }, []);

  // Filter documents by category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredDocs(pendingDocs);
    } else {
      // Map category IDs to actual category names that might be in the database
      const categoryMap = {
        'research': ['Petroleum Engineering', 'Geophysics', 'Environmental Studies', 'Natural Gas', 'Reservoir Engineering', 'Technology', 'Economics'],
        'dataset': ['Production Data', 'Geological Data', 'Seismic Data', 'Economic Data', 'Environmental Data', 'Market Data'],
        'innovation': ['Hardware Innovation', 'Software Innovation', 'Process Innovation', 'Patent Application', 'Prototype Documentation'],
        'policy': ['Policy Analysis', 'Regulatory Framework', 'Economic Policy', 'Environmental Policy', 'Industry Regulation']
      };
      
      const categoryNames = categoryMap[selectedCategory] || [];
      const filtered = pendingDocs.filter(doc => 
        categoryNames.includes(doc.category) || 
        doc.category.toLowerCase().includes(selectedCategory)
      );
      setFilteredDocs(filtered);
    }
  }, [selectedCategory, pendingDocs]);

  // Update category counts
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'All') return pendingDocs.length;
    
    const categoryMap = {
      'research': ['Petroleum Engineering', 'Geophysics', 'Environmental Studies', 'Natural Gas', 'Reservoir Engineering', 'Technology', 'Economics'],
      'dataset': ['Production Data', 'Geological Data', 'Seismic Data', 'Economic Data', 'Environmental Data', 'Market Data'],
      'innovation': ['Hardware Innovation', 'Software Innovation', 'Process Innovation', 'Patent Application', 'Prototype Documentation'],
      'policy': ['Policy Analysis', 'Regulatory Framework', 'Economic Policy', 'Environmental Policy', 'Industry Regulation']
    };
    
    const categoryNames = categoryMap[categoryId] || [];
    return pendingDocs.filter(doc => 
      categoryNames.includes(doc.category) || 
      doc.category.toLowerCase().includes(categoryId)
    ).length;
  };

  const handleViewDocument = (doc) => {
    navigate(`/admin/review/${doc.id}`, { state: { document: doc } });
  };

  const quickApprove = async (docId) => {
    try {
      await admin.approveDocument(docId);
      await fetchPendingDocuments(); // Refresh list
    } catch (err) {
      console.error('Error approving document:', err);
      alert('Failed to approve document');
    }
  };

  const quickReject = async (docId) => {
    try {
      await admin.rejectDocument(docId);
      await fetchPendingDocuments(); // Refresh list
    } catch (err) {
      console.error('Error rejecting document:', err);
      alert('Failed to reject document');
    }
  };

  if (!isAdmin()) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="h-8 w-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          </div>
          <p className="text-slate-600">
            Welcome back, {user?.name}. Review and manage pending document submissions.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {documentCategories.map((category) => (
            <Card 
              key={category.id}
              className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                selectedCategory === category.id 
                  ? 'border-emerald-500 bg-emerald-50' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{category.name}</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {getCategoryCount(category.id)}
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg ${
                    selectedCategory === category.id 
                      ? 'bg-emerald-200 text-emerald-700' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {category.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Pending Documents - {selectedCategory}</span>
              <div className="text-sm font-normal text-slate-500">
                {filteredDocs.length} documents
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                <p className="text-slate-500 mt-2">Loading documents...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-600">
                <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                <p>{error}</p>
                <Button 
                  onClick={fetchPendingDocuments}
                  variant="outline"
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            ) : filteredDocs.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No pending documents in this category.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDocs.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-slate-900 mb-1">
                            {doc.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                              {doc.category}
                            </span>
                            <span>By: {doc.uploader?.name || 'Unknown'}</span>
                            <span>Size: {(doc.file_size / 1024 / 1024).toFixed(1)}MB</span>
                            <span>Submitted: {new Date(doc.created_at).toLocaleDateString()}</span>
                          </div>
                          {doc.description && (
                            <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                              {doc.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDocument(doc)}
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            Review
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => quickApprove(doc.id)}
                            className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                          >
                            <Check className="h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => quickReject(doc.id)}
                            className="flex items-center gap-1"
                          >
                            <X className="h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;