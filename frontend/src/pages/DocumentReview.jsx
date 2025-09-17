import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { admin, documents } from '../lib/api';
import DocumentViewer from '../components/DocumentViewer';
import { 
  ArrowLeft,
  Check,
  X,
  Download,
  FileText,
  User,
  Calendar,
  HardDrive,
  Tag,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const DocumentReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useAuth();
  
  const [document, setDocument] = useState(location.state?.document || null);
  const [loading, setLoading] = useState(!document);
  const [error, setError] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const [previewLoading, setPreviewLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState('');
  const [currentUserVote, setCurrentUserVote] = useState(null);
  const [approvalCounts, setApprovalCounts] = useState({ approve_votes_count: 0, reject_votes_count: 0 });

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  // Fetch document if not provided via state
  useEffect(() => {
    if (!document && id) {
      fetchDocument();
    }
  }, [document, id]);

  // Fetch document preview content
  useEffect(() => {
    if (document) {
      loadPreviewContent();
    }
  }, [document]);

  const fetchDocument = async () => {
    try {
      setLoading(true);
      const response = await documents.getById(id);
      setDocument(response.data.document);
      setCurrentUserVote(response.data.current_user_vote);
      setApprovalCounts({
        approve_votes_count: response.data.document.approve_votes_count || 0,
        reject_votes_count: response.data.document.reject_votes_count || 0
      });
    } catch (err) {
      setError('Failed to fetch document details');
      console.error('Error fetching document:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadPreviewContent = async () => {
    if (!document) return;
    
    setPreviewLoading(true);
    try {
      // Try to load preview for supported file types
      if (['txt', 'json', 'csv'].includes(document.file_type)) {
        const response = await documents.preview(document.id);
        setPreviewContent(response.data.content);
      } else if (document.file_type === 'pdf') {
        setPreviewContent('PDF preview coming soon. Please download to view content.');
      } else {
        setPreviewContent(`${document.file_type.toUpperCase()} file preview not supported. Please download to view content.`);
      }
    } catch (err) {
      console.error('Error loading preview:', err);
      setPreviewContent('Unable to load preview content. Please download the document to view it.');
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!document) return;
    
    try {
      setActionLoading(true);
      const response = await admin.approveDocument(document.id);
      setShowSuccess(response.data.message);
      
      // Update counts and vote status
      setApprovalCounts({
        approve_votes_count: response.data.approval_count,
        reject_votes_count: response.data.reject_count
      });
      setCurrentUserVote({ decision: 'approve' });
      
      // If document is now fully approved, redirect after delay
      if (response.data.status === 'approved') {
        setTimeout(() => {
          navigate('/admin');
        }, 3000);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to approve document';
      alert(errorMsg);
      console.error('Error approving document:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!document) return;
    
    const confirmed = window.confirm('Are you sure you want to reject this document?');
    if (!confirmed) return;
    
    try {
      setActionLoading(true);
      const response = await admin.rejectDocument(document.id);
      setShowSuccess(response.data.message);
      
      // Update counts and vote status
      setApprovalCounts({
        approve_votes_count: response.data.approval_count,
        reject_votes_count: response.data.reject_count
      });
      setCurrentUserVote({ decision: 'reject' });
      
      // If document is now fully rejected, redirect after delay
      if (response.data.status === 'rejected') {
        setTimeout(() => {
          navigate('/admin');
        }, 3000);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to reject document';
      alert(errorMsg);
      console.error('Error rejecting document:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!document) return;
    
    try {
      const response = await documents.download(document.id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', document.file_name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to download document');
      console.error('Error downloading document:', err);
    }
  };

  if (!isAdmin()) {
    return null; // Will redirect
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Error</h2>
            <p className="text-slate-600 mb-4">{error || 'Document not found'}</p>
            <Button onClick={() => navigate('/admin')} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Message */}
        {showSuccess && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-green-700 font-medium">{showSuccess}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Document Review</h1>
              <p className="text-slate-600">Review and approve document submission</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleDownload}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button
              onClick={handleReject}
              variant="destructive"
              disabled={actionLoading || currentUserVote}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              {actionLoading ? 'Processing...' : currentUserVote ? 'Already Voted' : 'Reject'}
            </Button>
            <Button
              onClick={handleApprove}
              disabled={actionLoading || currentUserVote}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              {actionLoading ? 'Processing...' : currentUserVote ? 'Already Voted' : 'Approve'}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Document Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Document Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{document.title}</h3>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    {document.category}
                  </span>
                </div>

                {document.description && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-1">Description</h4>
                    <p className="text-sm text-slate-600">{document.description}</p>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">
                      Uploaded by: <span className="font-medium">{document.uploader?.name || 'Unknown'}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">
                      Submitted: <span className="font-medium">{new Date(document.created_at).toLocaleString()}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <HardDrive className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">
                      File size: <span className="font-medium">{(document.file_size / 1024 / 1024).toFixed(1)} MB</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">
                      File type: <span className="font-medium uppercase">{document.file_type}</span>
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-slate-600">Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      document.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : document.status === 'approved'
                        ? 'bg-green-100 text-green-800'  
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {document.status}
                    </span>
                  </div>
                  
                  {/* Approval Voting System */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-slate-700">Academic Review Progress</div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-slate-600">Approvals</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-600">{approvalCounts.approve_votes_count}</span>
                        <span className="text-sm text-slate-500">/ 7 required</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span className="text-sm text-slate-600">Rejections</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-red-600">{approvalCounts.reject_votes_count}</span>
                        <span className="text-sm text-slate-500">/ 3 max</span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="relative">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${Math.min((approvalCounts.approve_votes_count / 7) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-slate-500 mt-1 text-center">
                        {approvalCounts.approve_votes_count >= 7 
                          ? '✅ Ready for Publication' 
                          : `${7 - approvalCounts.approve_votes_count} more approvals needed`
                        }
                      </div>
                    </div>
                    
                    {/* Current User's Vote Status */}
                    {currentUserVote && (
                      <div className={`p-2 rounded-lg text-xs ${
                        currentUserVote.decision === 'approve'
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        You have {currentUserVote.decision === 'approve' ? 'approved' : 'rejected'} this document.
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Preview */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle>Document Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <div className="h-full">
                  {previewLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-2"></div>
                        <p className="text-slate-500">Loading preview...</p>
                      </div>
                    </div>
                  ) : (
                    <DocumentViewer
                      document={document}
                      content={previewContent}
                      onDownload={handleDownload}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentReview;