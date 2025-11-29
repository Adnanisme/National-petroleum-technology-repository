import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:9000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getUser: () => api.get('/auth/user'),
};

// Document endpoints
export const documents = {
  getAll: (params = {}) => api.get('/documents', { params }),
  getById: (id) => api.get(`/documents/${id}`),
  upload: (formData) => api.post('/documents', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  download: (id) => api.get(`/documents/${id}/download`, {
    responseType: 'blob'
  }),
  preview: (id) => api.get(`/documents/${id}/preview`),
  search: (query) => api.get('/documents', { 
    params: { search: query } 
  }),
};

// Organization endpoints
export const organizations = {
  getAll: () => api.get('/organizations'),
  getById: (id) => api.get(`/organizations/${id}`),
  create: (data) => api.post('/organizations', data),
  update: (id, data) => api.patch(`/organizations/${id}`, data),
  getUsers: (id) => api.get(`/organizations/${id}/users`),
  createUser: (id, userData) => api.post(`/organizations/${id}/users`, userData),
  createAdmin: (id, adminData) => api.post(`/organizations/${id}/admin`, adminData),
};

// Admin endpoints
export const admin = {
  getPendingDocuments: () => api.get('/admin/documents/pending'),
  approveDocument: (id) => api.patch(`/admin/documents/${id}/approve`),
  rejectDocument: (id) => api.patch(`/admin/documents/${id}/reject`),
};

export default api;