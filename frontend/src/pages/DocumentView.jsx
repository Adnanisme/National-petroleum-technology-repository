import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FileText, Download, Share, Bookmark, Clock, User, Calendar, 
  Tag, BarChart3, Eye, ArrowLeft, ExternalLink, AlertCircle,
  ChevronRight, Star, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DocumentViewer from '@/components/DocumentViewer';
import { documents } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function DocumentView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [document, setDocument] = useState(null);
  const [previewContent, setPreviewContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [error, setError] = useState('');
  const [relatedDocs, setRelatedDocs] = useState([]);
  const [viewMode, setViewMode] = useState('preview'); // 'preview' or 'metadata'

  useEffect(() => {
    fetchDocument();
  }, [id]);

  useEffect(() => {
    if (document) {
      fetchRelatedDocuments();
    }
  }, [document]);

  const fetchDocument = async () => {
    try {
      setLoading(true);
      const response = await documents.getById(id);
      setDocument(response.data.document);
      
      // Try to fetch preview content
      await fetchPreviewContent(response.data.document);
    } catch (error) {
      console.error('Error fetching document:', error);
      setError('Failed to load document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPreviewContent = async (doc) => {
    try {
      setPreviewLoading(true);
      
      if (doc.file_type?.toLowerCase() === 'pdf') {
        // For PDFs, we'll use the DocumentViewer component directly
        setPreviewContent('PDF preview will be handled by DocumentViewer');
      } else if (['txt', 'json', 'csv'].includes(doc.file_type?.toLowerCase())) {
        const response = await documents.preview(doc.id);
        setPreviewContent(response.data);
      } else {
        setPreviewContent('Preview not supported for this file type');
      }
    } catch (error) {
      console.error('Error loading preview:', error);
      setPreviewContent('Unable to load preview content');
    } finally {
      setPreviewLoading(false);
    }
  };

  const fetchRelatedDocuments = async () => {
    try {
      // Fetch documents in the same category
      const response = await documents.getAll({ 
        category: document?.category,
        limit: 3 
      });
      setRelatedDocs(response.data.data?.filter(doc => doc.id !== parseInt(id)) || []);
    } catch (error) {
      console.error('Error fetching related documents:', error);
    }
  };

  const handleDownload = async () => {
    try {
      console.log('Downloading document:', document.id);
      const response = await documents.download(document.id);
      console.log('Download response:', response);
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', document.file_name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading document:', error);
      console.error('Error details:', error.response?.data);
      alert(`Error downloading document: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: document.title,
        text: document.description,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Document Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The document you requested could not be found.'}</p>
          <Button onClick={() => navigate('/repository')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Repository
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/repository')}
            className="mb-4 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Repository
          </Button>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              
              {/* Document Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                      {document.title}
                    </h1>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {document.uploader?.name || 'Unknown Author'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(document.created_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <BarChart3 className="h-4 w-4" />
                        {formatFileSize(document.file_size)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tags and Category */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
                    <Tag className="h-3 w-3" />
                    {document.category}
                  </span>
                  {document.type && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                      {document.type}
                    </span>
                  )}
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm uppercase">
                    {document.file_type}
                  </span>
                </div>

                {/* Description */}
                {document.description && (
                  <div className="prose prose-gray max-w-none mb-6">
                    <p className="text-gray-700 leading-relaxed">{document.description}</p>
                  </div>
                )}

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 mb-4">
                  <Button
                    variant={viewMode === 'preview' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('preview')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    variant={viewMode === 'metadata' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('metadata')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 lg:w-64">
                <Button 
                  onClick={handleDownload}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                
                <Button variant="outline" onClick={handleShare}>
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                
                {isAuthenticated && (
                  <Button variant="outline">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save to Library
                  </Button>
                )}

                {/* Document Stats */}
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-sm">Document Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">File Size</span>
                      <span className="font-medium">{formatFileSize(document.file_size)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Format</span>
                      <span className="font-medium uppercase">{document.file_type}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Added</span>
                      <span className="font-medium">{formatDate(document.created_at)}</span>
                    </div>
                    {document.updated_at && document.updated_at !== document.created_at && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Modified</span>
                        <span className="font-medium">{formatDate(document.updated_at)}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {viewMode === 'preview' ? (
              <Card className="h-[800px]">
                <CardContent className="h-full p-0">
                  {previewLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading preview...</p>
                      </div>
                    </div>
                  ) : (
                    <DocumentViewer
                      document={document}
                      content={previewContent}
                      onDownload={handleDownload}
                    />
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Document Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">File Information</h3>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Filename:</dt>
                          <dd className="font-medium">{document.file_name}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Type:</dt>
                          <dd className="font-medium uppercase">{document.file_type}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Size:</dt>
                          <dd className="font-medium">{formatFileSize(document.file_size)}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Category:</dt>
                          <dd className="font-medium">{document.category}</dd>
                        </div>
                      </dl>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Publishing Information</h3>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Author:</dt>
                          <dd className="font-medium">{document.uploader?.name || 'Unknown'}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Published:</dt>
                          <dd className="font-medium">{formatDate(document.created_at)}</dd>
                        </div>
                        {document.uploader?.organization && (
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Organization:</dt>
                            <dd className="font-medium">{document.uploader.organization}</dd>
                          </div>
                        )}
                      </dl>
                    </div>
                  </div>

                  {document.description && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Abstract</h3>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-700 leading-relaxed">{document.description}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Related Documents */}
            {relatedDocs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedDocs.slice(0, 3).map((relatedDoc) => (
                      <div 
                        key={relatedDoc.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                        onClick={() => navigate(`/documents/${relatedDoc.id}`)}
                      >
                        <FileText className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                            {relatedDoc.title}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {relatedDoc.uploader?.name} • {relatedDoc.category}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in New Tab
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Report Issue
                  </Button>
                  {isAuthenticated && (
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Star className="h-4 w-4 mr-2" />
                      Rate Document
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}