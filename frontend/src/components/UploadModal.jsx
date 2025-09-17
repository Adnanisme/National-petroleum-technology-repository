import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { documents } from '../lib/api';
import { X, Upload, File } from 'lucide-react';

const UploadModal = ({ onClose, onUpload }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    file: null
  });

  const categories = [
    'Petroleum Engineering',
    'Geophysics',
    'Environmental Studies',
    'Natural Gas',
    'Reservoir Engineering',
    'Technology',
    'Policy Studies',
    'Economics',
    'Health & Safety'
  ];

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
      onUpload();
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setError('Only PDF, DOC, and DOCX files are allowed');
        return;
      }
      
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      setFormData({ ...formData, file });
      setError('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setError('Only PDF, DOC, and DOCX files are allowed');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      setFormData({ ...formData, file });
      setError('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-500 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
          <CardTitle className="text-2xl">Upload Document</CardTitle>
          <p className="text-sm text-slate-600">
            Share your research with the NPTR community
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
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
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Provide a brief description or abstract"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                File Upload *
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  dragOver ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300'
                } ${formData.file ? 'border-emerald-500 bg-emerald-50' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                {formData.file ? (
                  <div className="flex items-center justify-center gap-2">
                    <File className="h-6 w-6 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">
                      {formData.file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, file: null })}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-sm text-slate-600 mb-2">
                      Drag and drop your file here, or{' '}
                      <label className="text-emerald-600 hover:text-emerald-700 cursor-pointer">
                        browse
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                      </label>
                    </p>
                    <p className="text-xs text-slate-500">
                      Supported formats: PDF, DOC, DOCX (Max 10MB)
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
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

          <div className="mt-4 text-xs text-slate-500">
            <p>
              <strong>Note:</strong> Your document will be reviewed by administrators before being published in the repository.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadModal;