import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useAuth } from '../context/AuthContext';
import { X, Eye, EyeOff } from 'lucide-react';

const AuthModal = ({ mode, onClose, onSwitchMode }) => {
  const { login, register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      if (mode === 'login') {
        result = await login({
          email: formData.email,
          password: formData.password
        });
      } else {
        if (formData.password !== formData.password_confirmation) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        result = await register(formData);
      }

      if (result.success) {
        onClose();
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-500 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
          <CardTitle className="text-2xl">
            {mode === 'login' ? 'Log In' : 'Register'}
          </CardTitle>
          <p className="text-sm text-slate-600">
            {mode === 'login'
              ? 'Access your NPTR account'
              : 'Create your NPTR account'
            }
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Confirm your password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Account Type
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="user">Regular User</option>
                    <option value="contributor">Contributor</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-1">
                    Contributors can upload documents for review
                  </p>
                </div>
              </>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? 'Please wait...' : (mode === 'login' ? 'Log In' : 'Create Account')}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            {mode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => onSwitchMode('register')}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => onSwitchMode('login')}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Log in
                </button>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthModal;