import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { documents } from '../lib/api';
import { 
  Upload as UploadIcon, 
  FileText, 
  Database, 
  Lightbulb, 
  Building2,
  File,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Upload = () => {
  const navigate = useNavigate();
  const { user, isContributor } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    file: null
  });
  const [selectedType, setSelectedType] = useState('document');

  // Redirect if not contributor
  useEffect(() => {
    if (!isContributor()) {
      navigate('/login');
    }
  }, [isContributor, navigate]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback categories
        setCategories(['Computing', 'Engineering', 'Management', 'GeoSciences', 'Environmental']);
      }
    };
    fetchCategories();
  }, []);

  const acceptedFiles = '.pdf,.doc,.docx,.csv,.xlsx,.json,.txt,.ppt,.pptx';
  const maxSizeInBytes = 50 * 1024 * 1024; // 50MB

  // Document types configuration
  const documentTypes = [
    {
      id: 'document',
      title: 'Document',
      description: 'Upload research papers, reports, and other documents',
      icon: <FileText className="h-8 w-8" />,
      acceptedFiles: acceptedFiles,
      maxSize: '50MB'
    }
  ];

  const selectedTypeData = documentTypes.find(type => type.id === selectedType);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      setError('Please select a file to upload');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const uploadData = new FormData();
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('category', formData.category);
      uploadData.append('file', formData.file);

      await documents.upload(uploadData);
      setSuccess('Document uploaded successfully! It will be reviewed by administrators.');
      
      // Reset form
      setFormData({ title: '', description: '', category: '', file: null });
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/repository');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (file) => {
    if (!file) return;

    // Check file type
    const allowedExtensions = acceptedFiles.split(',').map(ext => ext.trim());
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
      setError(`Only ${acceptedFiles} files are allowed`);
      return;
    }
    
    // Check file size
    if (file.size > maxSizeInBytes) {
      setError('File size must be less than 50MB');
      return;
    }

    setFormData({ ...formData, file });
    setError('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  if (!isContributor()) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Upload Document</h1>
          <p className="text-slate-600">
            Share your research and data with the NPTR community
          </p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-green-700">{success}</p>
          </div>
        )}

        {/* Upload Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="text-emerald-600">
                <FileText className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-xl">Upload Document</CardTitle>
                <p className="text-sm text-slate-600">Upload research papers, reports, and other documents</p>
              </div>
            </div>
          </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-center gap-3 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Document Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter the document title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Provide a brief description or abstract"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    File Upload *
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragOver ? 'border-emerald-500 bg-emerald-50' : 
                      formData.file ? 'border-emerald-500 bg-emerald-50' : 
                      'border-slate-300 hover:border-slate-400'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    {formData.file ? (
                      <div className="flex items-center justify-center gap-3">
                        <File className="h-8 w-8 text-emerald-600" />
                        <div className="text-left">
                          <p className="font-medium text-emerald-700">{formData.file.name}</p>
                          <p className="text-sm text-slate-500">
                            {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, file: null })}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <UploadIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-lg font-medium text-slate-700 mb-2">
                          Drop your file here
                        </p>
                        <p className="text-sm text-slate-600 mb-4">
                          or{' '}
                          <label className="text-emerald-600 hover:text-emerald-700 cursor-pointer underline">
                            browse files
                            <input
                              type="file"
                              className="hidden"
                              accept={acceptedFiles}
                              onChange={(e) => handleFileChange(e.target.files[0])}
                            />
                          </label>
                        </p>
                        <div className="text-xs text-slate-500 space-y-1">
                          <p>Accepted formats: {acceptedFiles}</p>
                          <p>Maximum file size: 50MB</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading || !formData.file}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  >
                    {loading ? 'Uploading...' : 'Upload Document'}
                  </Button>
                </div>
              </form>

              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-600">
                  <strong>Review Process:</strong> Your document will be reviewed by NPTR administrators 
                  before being published. You'll receive notification once the review is complete.
                </p>
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  );
};

export default Upload;