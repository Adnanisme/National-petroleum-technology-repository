import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  FileText, 
  Eye,
  Check,
  X,
  Download,
  AlertCircle,
  CheckCircle,
  XCircle,
  BookOpen,
  Clock,
  TrendingUp
} from 'lucide-react';

const AcademicDashboard = () => {
  const navigate = useNavigate();
  const { user, isAcademic } = useAuth();
  const [pendingDocs, setPendingDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    pending: 0,
    reviewed: 0,
    approved: 0,
    rejected: 0
  });

  // Redirect if not academic
  useEffect(() => {
    if (!isAcademic()) {
      navigate('/');
    }
  }, [isAcademic, navigate]);

  // Fetch pending documents for academic's specialization
  const fetchPendingDocuments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      const response = await fetch('http://127.0.0.1:8000/api/documents/pending', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPendingDocs(data.data || []);
        setStats({
          pending: data.data?.length || 0,
          reviewed: data.total_reviewed || 0,
          approved: data.total_approved || 0,
          rejected: data.total_rejected || 0
        });
      } else {
        throw new Error('Failed to fetch documents');
      }
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

  const handleViewDocument = (doc) => {
    navigate(`/academic/review/${doc.id}`, { state: { document: doc } });
  };

  const quickApprove = async (docId) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://127.0.0.1:8000/api/documents/${docId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        await fetchPendingDocuments(); // Refresh list
        const data = await response.json();
        alert(data.message || 'Document approved successfully');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to approve document');
      }
    } catch (err) {
      console.error('Error approving document:', err);
      alert(err.message || 'Failed to approve document');
    }
  };

  const quickReject = async (docId) => {
    const confirmed = window.confirm('Are you sure you want to reject this document?');
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://127.0.0.1:8000/api/documents/${docId}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        await fetchPendingDocuments(); // Refresh list
        const data = await response.json();
        alert(data.message || 'Document rejected successfully');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to reject document');
      }
    } catch (err) {
      console.error('Error rejecting document:', err);
      alert(err.message || 'Failed to reject document');
    }
  };

  if (!isAcademic()) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-900">Academic Dashboard</h1>
          </div>
          <p className="text-slate-600">
            Welcome back, {user?.name}. Review documents in your specialization: <span className="font-semibold text-blue-600">{user?.specialization}</span>
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending Review</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.pending}</p>
                </div>
                <div className="p-2 rounded-lg bg-yellow-200 text-yellow-700">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Reviewed</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.reviewed}</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-200 text-blue-700">
                  <BookOpen className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <div className="p-2 rounded-lg bg-green-200 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <div className="p-2 rounded-lg bg-red-200 text-red-700">
                  <XCircle className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Pending Documents - {user?.specialization} Category</span>
              <div className="text-sm font-normal text-slate-500">
                {pendingDocs.length} documents awaiting your review
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
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
            ) : pendingDocs.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No pending documents in your specialization ({user?.specialization}).</p>
                <p className="text-sm text-slate-400 mt-1">Check back later for new submissions to review.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingDocs.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-md transition-shadow border border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-slate-900 mb-1">
                            {doc.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              doc.category === user?.specialization 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
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

export default AcademicDashboard;