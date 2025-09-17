import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  ArrowLeft,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  Activity,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AcademicDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [academic, setAcademic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAcademicData();
  }, [id]);

  const fetchAcademicData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://127.0.0.1:8000/api/academics/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAcademic(data);
      }
    } catch (error) {
      console.error('Error fetching academic:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://127.0.0.1:8000/api/academics/${id}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        fetchAcademicData(); // Refresh data
      }
    } catch (error) {
      console.error('Error toggling academic status:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading academic details...</p>
        </div>
      </div>
    );
  }

  if (!academic) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Academic not found</p>
          <Button onClick={() => navigate('/super-admin')} className="mt-4">
            Back to Dashboard
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
          <Button
            onClick={() => navigate('/super-admin')}
            variant="outline"
            className="mb-4 flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
                {academic.name}
              </h1>
              <p className="text-gray-600 mt-2">{academic.email}</p>
              {academic.institution && (
                <p className="text-gray-600">{academic.institution}</p>
              )}
              {academic.specialization && (
                <p className="text-sm text-gray-500 mt-1">
                  Specialization: {academic.specialization}
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                academic.is_active
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {academic.is_active ? 'Active' : 'Inactive'}
              </div>
              
              <Button
                onClick={handleToggleStatus}
                variant={academic.is_active ? 'destructive' : 'default'}
              >
                {academic.is_active ? 'Deactivate' : 'Activate'}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Documents Uploaded</p>
                  <p className="text-2xl font-bold text-gray-900">{academic.documents?.length || 0}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">{academic.total_reviews || 0}</p>
                </div>
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approvals</p>
                  <p className="text-2xl font-bold text-green-600">{academic.total_approvals || 0}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rejections</p>
                  <p className="text-2xl font-bold text-red-600">{academic.total_rejections || 0}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Uploaded Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Uploaded Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {academic.documents && academic.documents.length > 0 ? (
                  academic.documents.map((document) => (
                    <motion.div
                      key={document.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{document.title}</h4>
                          {document.description && (
                            <p className="text-sm text-gray-600 mt-1">{document.description}</p>
                          )}
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Category: {document.category}</span>
                            <span>Uploaded: {formatDate(document.created_at)}</span>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          document.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : document.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {document.status}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No documents uploaded yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Review History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Review History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {academic.approval_history && academic.approval_history.length > 0 ? (
                  academic.approval_history.map((approval) => (
                    <motion.div
                      key={approval.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {approval.document?.title || 'Document'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Uploaded by: {approval.document?.uploader?.name || 'Unknown'}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Reviewed: {formatDate(approval.created_at)}</span>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium flex items-center ${
                          approval.decision === 'approve'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {approval.decision === 'approve' ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <XCircle className="h-3 w-3 mr-1" />
                          )}
                          {approval.decision === 'approve' ? 'Approved' : 'Rejected'}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No reviews completed yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AcademicDetailView;