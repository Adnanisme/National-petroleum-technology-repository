import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import { Upload, FileText, User, Calendar, CheckCircle, XCircle, Clock, Download } from 'lucide-react';

export default function Trainees() {
  const { isAuthenticated, isSuperAdmin, isAdmin, user } = useAuth();
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    bio: '',
    education_level: '',
    field_of_study: '',
    institution: '',
    cv: null
  });

  useEffect(() => {
    fetchTrainees();
  }, [selectedStatus]);

  const fetchTrainees = async () => {
    try {
      const params = selectedStatus !== 'all' ? { status: selectedStatus } : {};
      const response = await api.get('/trainees', { params });
      setTrainees(response.data.data || []);
    } catch (error) {
      console.error('Error fetching trainees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please log in to submit your application');
      return;
    }

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      await api.post('/trainees', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Application submitted successfully!');
      setShowForm(false);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        bio: '',
        education_level: '',
        field_of_study: '',
        institution: '',
        cv: null
      });
      fetchTrainees();
    } catch (error) {
      alert('Error submitting application: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const updateTraineeStatus = async (traineeId, status, adminNotes = '') => {
    try {
      await api.put(`/trainees/${traineeId}`, {
        status,
        admin_notes: adminNotes
      });
      fetchTrainees();
      alert('Status updated successfully');
    } catch (error) {
      alert('Error updating status: ' + (error.response?.data?.message || error.message));
    }
  };

  const downloadCV = async (traineeId) => {
    try {
      const response = await api.get(`/trainees/${traineeId}/download-cv`, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition 
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : `cv_${traineeId}.pdf`;
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Error downloading CV: ' + (error.response?.data?.message || error.message));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'rejected':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Trainees & Scholars Program
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Join our program for aspiring professionals and researchers. Submit your CV and become part of our learning community.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {isAuthenticated && (
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            {showForm ? 'Hide Application Form' : 'Submit Application'}
          </Button>
        )}

        {(isSuperAdmin() || isAdmin()) && (
          <div className="flex gap-2">
            <Button
              variant={selectedStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('all')}
              size="sm"
            >
              All ({trainees.length})
            </Button>
            <Button
              variant={selectedStatus === 'pending' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('pending')}
              size="sm"
            >
              Pending
            </Button>
            <Button
              variant={selectedStatus === 'approved' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('approved')}
              size="sm"
            >
              Approved
            </Button>
            <Button
              variant={selectedStatus === 'rejected' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('rejected')}
              size="sm"
            >
              Rejected
            </Button>
          </div>
        )}
      </div>

      {showForm && (
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Submit Your Application</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Education Level
                </label>
                <select
                  name="education_level"
                  value={formData.education_level}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select Level</option>
                  <option value="Bachelor's">Bachelor's Degree</option>
                  <option value="Master's">Master's Degree</option>
                  <option value="PhD">PhD</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Certificate">Certificate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Field of Study
                </label>
                <input
                  type="text"
                  name="field_of_study"
                  value={formData.field_of_study}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Institution
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  placeholder="e.g., University of Lagos"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Bio/Personal Statement
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tell us about yourself, your interests, and why you want to join this program..."
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Upload CV *
              </label>
              <input
                type="file"
                name="cv"
                onChange={handleInputChange}
                accept=".pdf,.doc,.docx"
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-sm text-slate-500 mt-1">
                Accepted formats: PDF, DOC, DOCX (Max: 10MB)
              </p>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                Submit Application
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {trainees.length === 0 ? (
          <Card className="p-8 text-center">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-700 mb-2">No Applications Yet</h3>
            <p className="text-slate-500">
              {isAuthenticated ? 'Be the first to submit your application!' : 'Please log in to submit an application.'}
            </p>
          </Card>
        ) : (
          trainees.map((trainee) => (
            <Card key={trainee.id} className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <User className="w-5 h-5 text-slate-600" />
                    <h3 className="text-lg font-semibold text-slate-800">
                      {trainee.first_name} {trainee.last_name}
                    </h3>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(trainee.status)}`}>
                      {getStatusIcon(trainee.status)}
                      <span className="capitalize">{trainee.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-slate-600 mb-4">
                    <div>
                      <strong>Email:</strong> {trainee.email}
                    </div>
                    {trainee.phone && (
                      <div>
                        <strong>Phone:</strong> {trainee.phone}
                      </div>
                    )}
                    {trainee.education_level && (
                      <div>
                        <strong>Education:</strong> {trainee.education_level}
                      </div>
                    )}
                    {trainee.field_of_study && (
                      <div>
                        <strong>Field:</strong> {trainee.field_of_study}
                      </div>
                    )}
                    {trainee.institution && (
                      <div>
                        <strong>Institution:</strong> {trainee.institution}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Applied: {new Date(trainee.submitted_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {trainee.bio && (
                    <div className="mb-4">
                      <strong className="text-sm text-slate-700">Bio:</strong>
                      <p className="text-sm text-slate-600 mt-1">{trainee.bio}</p>
                    </div>
                  )}

                  {trainee.admin_notes && (
                    <div className="bg-slate-50 p-3 rounded-md">
                      <strong className="text-sm text-slate-700">Admin Notes:</strong>
                      <p className="text-sm text-slate-600 mt-1">{trainee.admin_notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => downloadCV(trainee.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download CV
                  </Button>

                  {(isSuperAdmin() || isAdmin()) && (
                    <div className="flex flex-col gap-2">
                      {trainee.status === 'pending' && (
                        <>
                          <Button
                            onClick={() => updateTraineeStatus(trainee.id, 'approved')}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => {
                              const notes = prompt('Rejection reason (optional):');
                              updateTraineeStatus(trainee.id, 'rejected', notes || '');
                            }}
                            size="sm"
                            variant="destructive"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                      {trainee.status !== 'pending' && (
                        <Button
                          onClick={() => updateTraineeStatus(trainee.id, 'pending')}
                          size="sm"
                          variant="outline"
                        >
                          Reset to Pending
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}