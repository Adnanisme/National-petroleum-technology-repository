import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import {
  Upload, FileText, User, Calendar, CheckCircle, XCircle, Clock,
  Download, Briefcase, GraduationCap, Users2, TrendingUp, Mail,
  Phone, MapPin, Award, Globe, Star
} from 'lucide-react';
import { motion } from 'framer-motion';

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
    cv: null,
    skills: '',
    years_experience: '',
    linkedin_url: '',
    preferred_job_type: '',
    availability: ''
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
        cv: null,
        skills: '',
        years_experience: '',
        linkedin_url: '',
        preferred_job_type: '',
        availability: ''
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
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <GraduationCap className="h-10 w-10 text-emerald-600" />
            <h1 className="text-4xl md:text-5xl font-bold">Career & Development Portal</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Launch your career in Nigeria's petroleum sector. Connect with opportunities, mentorship, and professional development.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>450+ Opportunities</span>
            </div>
            <div className="flex items-center gap-2">
              <Users2 className="h-4 w-4" />
              <span>1,200+ Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>85% Placement Rate</span>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-3xl border-slate-200 h-full">
              <div className="h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-t-3xl p-5 flex items-center justify-center">
                <Briefcase className="h-10 w-10 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Career Opportunities</h3>
                <p className="text-sm text-slate-600">
                  Access exclusive job openings, internships, and research positions across the petroleum sector.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-3xl border-slate-200 h-full">
              <div className="h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-t-3xl p-5 flex items-center justify-center">
                <Users2 className="h-10 w-10 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Mentorship Network</h3>
                <p className="text-sm text-slate-600">
                  Connect with industry experts and experienced professionals who guide your career journey.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="rounded-3xl border-slate-200 h-full">
              <div className="h-24 bg-gradient-to-br from-purple-500 to-violet-600 rounded-t-3xl p-5 flex items-center justify-center">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Professional Development</h3>
                <p className="text-sm text-slate-600">
                  Access training programs, workshops, and certifications to enhance your skills and expertise.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Create Profile', desc: 'Submit your CV and professional details', icon: <User className="h-6 w-6" /> },
              { step: '2', title: 'Get Verified', desc: 'Our team reviews your application', icon: <CheckCircle className="h-6 w-6" /> },
              { step: '3', title: 'Connect', desc: 'Match with opportunities and mentors', icon: <Users2 className="h-6 w-6" /> },
              { step: '4', title: 'Launch Career', desc: 'Start your petroleum sector journey', icon: <TrendingUp className="h-6 w-6" /> }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <Card className="rounded-2xl border-emerald-200 text-center p-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
                    {item.icon}
                  </div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{item.step}</div>
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-600">{item.desc}</p>
                </Card>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-emerald-200 -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

      {/* Statistics Dashboard (Admin View) */}
      {(isSuperAdmin() || isAdmin()) && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="rounded-2xl border-slate-200">
            <CardContent className="p-5">
              <div className="text-3xl font-bold text-emerald-600">{trainees.length}</div>
              <div className="text-sm text-slate-600 mt-1">Total Applications</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-slate-200">
            <CardContent className="p-5">
              <div className="text-3xl font-bold text-yellow-600">
                {trainees.filter(t => t.status === 'pending').length}
              </div>
              <div className="text-sm text-slate-600 mt-1">Pending Review</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-slate-200">
            <CardContent className="p-5">
              <div className="text-3xl font-bold text-green-600">
                {trainees.filter(t => t.status === 'approved').length}
              </div>
              <div className="text-sm text-slate-600 mt-1">Approved</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-slate-200">
            <CardContent className="p-5">
              <div className="text-3xl font-bold text-blue-600">
                {Math.round((trainees.filter(t => t.status === 'approved').length / Math.max(trainees.length, 1)) * 100)}%
              </div>
              <div className="text-sm text-slate-600 mt-1">Approval Rate</div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between items-start sm:items-center">
        {isAuthenticated && (
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-emerald-600 hover:bg-emerald-700 rounded-2xl"
          >
            <Upload className="w-4 h-4 mr-2" />
            {showForm ? 'Hide Application Form' : 'Submit Application'}
          </Button>
        )}

        {(isSuperAdmin() || isAdmin()) && (
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('all')}
              size="sm"
              className="rounded-xl"
            >
              All ({trainees.length})
            </Button>
            <Button
              variant={selectedStatus === 'pending' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('pending')}
              size="sm"
              className="rounded-xl"
            >
              Pending
            </Button>
            <Button
              variant={selectedStatus === 'approved' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('approved')}
              size="sm"
              className="rounded-xl"
            >
              Approved
            </Button>
            <Button
              variant={selectedStatus === 'rejected' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('rejected')}
              size="sm"
              className="rounded-xl"
            >
              Rejected
            </Button>
          </div>
        )}
      </div>

      {showForm && (
        <Card className="rounded-3xl p-8 mb-8 border-slate-200">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <FileText className="h-6 w-6 text-emerald-600" />
            Submit Your Application
          </h2>
          <p className="text-sm text-slate-600 mb-6">Complete all required fields to apply for opportunities in the petroleum sector</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <User className="h-4 w-4 text-emerald-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+234 XXX XXX XXXX"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-emerald-600" />
                Education
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Education Level
                  </label>
                  <select
                    name="education_level"
                    value={formData.education_level}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white"
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
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    name="field_of_study"
                    value={formData.field_of_study}
                    onChange={handleInputChange}
                    placeholder="e.g., Petroleum Engineering"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Institution
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    placeholder="e.g., University of Lagos"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-emerald-600" />
                Professional Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Years of Experience
                  </label>
                  <select
                    name="years_experience"
                    value={formData.years_experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white"
                  >
                    <option value="">Select Experience</option>
                    <option value="0-1">0-1 years (Entry Level)</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preferred Job Type
                  </label>
                  <select
                    name="preferred_job_type"
                    value={formData.preferred_job_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white"
                  >
                    <option value="">Select Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Research">Research Position</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5" />
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Availability
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white"
                  >
                    <option value="">Select Availability</option>
                    <option value="Immediate">Immediate</option>
                    <option value="2 weeks">2 Weeks Notice</option>
                    <option value="1 month">1 Month Notice</option>
                    <option value="2-3 months">2-3 Months</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Star className="h-3.5 w-3.5" />
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="e.g., Reservoir Engineering, Data Analysis, Python, Well Testing"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
                <p className="text-xs text-slate-500 mt-1">Separate skills with commas</p>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Bio/Personal Statement
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tell us about yourself, your interests, career goals, and why you want to join the petroleum sector..."
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* CV Upload with Drag & Drop */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Upload CV *
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="cv"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                  required
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-emerald-500 hover:bg-emerald-50/50 transition-all">
                  <Upload className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-slate-700 mb-1">
                    {formData.cv ? formData.cv.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-slate-500">
                    PDF, DOC, DOCX (Max: 10MB)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 rounded-2xl px-8">
                <CheckCircle className="h-4 w-4 mr-2" />
                Submit Application
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                className="rounded-2xl px-8"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-6">
        {trainees.length === 0 ? (
          <Card className="rounded-3xl p-12 text-center border-slate-200">
            <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">No Applications Yet</h3>
            <p className="text-slate-500">
              {isAuthenticated ? 'Be the first to submit your application!' : 'Please log in to submit an application.'}
            </p>
          </Card>
        ) : (
          trainees.map((trainee) => (
            <motion.div
              key={trainee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="rounded-3xl overflow-hidden border-slate-200 hover:shadow-lg transition-all">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold">
                        {trainee.first_name?.[0]}{trainee.last_name?.[0]}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-1">
                          {trainee.first_name} {trainee.last_name}
                        </h3>
                        <p className="text-emerald-50 text-sm">
                          {trainee.field_of_study || 'Applicant'} {trainee.institution && `• ${trainee.institution}`}
                        </p>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold border-2 flex items-center gap-2 ${
                      trainee.status === 'approved' ? 'bg-green-500/20 border-white/40' :
                      trainee.status === 'rejected' ? 'bg-red-500/20 border-white/40' :
                      'bg-yellow-500/20 border-white/40'
                    }`}>
                      {getStatusIcon(trainee.status)}
                      <span className="capitalize">{trainee.status}</span>
                    </div>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="p-6">
                  {/* Contact & Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-emerald-600" />
                      <span className="text-slate-600">{trainee.email}</span>
                    </div>
                    {trainee.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-emerald-600" />
                        <span className="text-slate-600">{trainee.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-emerald-600" />
                      <span className="text-slate-600">
                        Applied {new Date(trainee.submitted_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Education & Professional Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {trainee.education_level && (
                      <div className="bg-slate-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <GraduationCap className="h-4 w-4 text-emerald-600" />
                          <span className="text-xs font-semibold text-slate-500 uppercase">Education</span>
                        </div>
                        <p className="text-sm font-medium text-slate-800">{trainee.education_level}</p>
                      </div>
                    )}
                    {trainee.years_experience && (
                      <div className="bg-slate-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="h-4 w-4 text-emerald-600" />
                          <span className="text-xs font-semibold text-slate-500 uppercase">Experience</span>
                        </div>
                        <p className="text-sm font-medium text-slate-800">{trainee.years_experience} years</p>
                      </div>
                    )}
                    {trainee.preferred_job_type && (
                      <div className="bg-slate-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-4 w-4 text-emerald-600" />
                          <span className="text-xs font-semibold text-slate-500 uppercase">Preference</span>
                        </div>
                        <p className="text-sm font-medium text-slate-800">{trainee.preferred_job_type}</p>
                      </div>
                    )}
                    {trainee.availability && (
                      <div className="bg-slate-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-emerald-600" />
                          <span className="text-xs font-semibold text-slate-500 uppercase">Availability</span>
                        </div>
                        <p className="text-sm font-medium text-slate-800">{trainee.availability}</p>
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  {trainee.skills && (
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {trainee.skills.split(',').map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bio */}
                  {trainee.bio && (
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Personal Statement</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{trainee.bio}</p>
                    </div>
                  )}

                  {/* LinkedIn */}
                  {trainee.linkedin_url && (
                    <div className="mb-6">
                      <a
                        href={trainee.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                      >
                        <Globe className="h-4 w-4" />
                        View LinkedIn Profile
                      </a>
                    </div>
                  )}

                  {/* Admin Notes */}
                  {trainee.admin_notes && (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
                      <p className="text-xs font-semibold text-amber-700 uppercase mb-2">Admin Notes</p>
                      <p className="text-sm text-amber-900">{trainee.admin_notes}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                    <Button
                      onClick={() => downloadCV(trainee.id)}
                      variant="outline"
                      className="rounded-xl"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download CV
                    </Button>

                    {(isSuperAdmin() || isAdmin()) && (
                      <>
                        {trainee.status === 'pending' && (
                          <>
                            <Button
                              onClick={() => updateTraineeStatus(trainee.id, 'approved')}
                              className="bg-green-600 hover:bg-green-700 rounded-xl"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              onClick={() => {
                                const notes = prompt('Rejection reason (optional):');
                                updateTraineeStatus(trainee.id, 'rejected', notes || '');
                              }}
                              variant="destructive"
                              className="rounded-xl"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        )}
                        {trainee.status !== 'pending' && (
                          <Button
                            onClick={() => updateTraineeStatus(trainee.id, 'pending')}
                            variant="outline"
                            className="rounded-xl"
                          >
                            Reset to Pending
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
      </div>
    </section>
  );
}