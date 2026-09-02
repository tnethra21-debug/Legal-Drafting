// frontend/src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Scale, Lock, Mail, User, Building, AlertCircle, ArrowRight } from 'lucide-react';

export const AuthPage = ({ mode = 'login', onNavigate }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(mode === 'login');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    institution: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleQuickFillDemo = (role = 'student') => {
    if (role === 'student') {
      setFormData({
        name: 'Aditya Sharma',
        email: 'student@lawcollege.edu',
        password: 'Student@123',
        confirmPassword: 'Student@123',
        institution: 'National Law School of India'
      });
    } else {
      setFormData({
        name: 'Prof. Lakshmi Narayanan',
        email: 'admin@lawcollege.edu',
        password: 'Student@123',
        confirmPassword: 'Student@123',
        institution: 'Faculty of Law, National University'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const res = await login(formData.email, formData.password);
        if (res.success) {
          // If student has not completed diagnostic, direct to diagnostic assessment
          if (!res.user.isDiagnosticCompleted) {
            onNavigate('diagnostic');
          } else {
            onNavigate('dashboard');
          }
        }
      } else {
        if (!formData.name || !formData.email || !formData.password) {
          throw new Error('Please fill in all required fields.');
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match.');
        }
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters.');
        }

        const res = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          institution: formData.institution
        });

        if (res.success) {
          onNavigate('diagnostic');
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mesh-gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xl relative">
        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 mx-auto mb-3 shadow-sm flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Scale className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            {isLogin ? 'Welcome Back to LegalDraft' : 'Create Law Student Account'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isLogin ? 'Enter your credentials to continue drafting' : 'Start your progressive legal drafting journey'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 mb-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`flex-1 py-2 rounded-lg transition ${
              isLogin ? 'bg-white text-amber-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`flex-1 py-2 rounded-lg transition ${
              !isLogin ? 'bg-white text-amber-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs mb-4">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Aditya Sharma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Law College / University</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="e.g. National Law School of India"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@lawcollege.edu"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm mt-4 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : isLogin ? 'Login' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Quick-Fill Pill */}
        <div className="mt-6 pt-4 border-t border-slate-200 text-center">
          <p className="text-[11px] text-slate-500 mb-2 font-medium">Quick demo test accounts:</p>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handleQuickFillDemo('student')}
              className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 font-semibold hover:bg-amber-100 transition"
            >
              Fill Demo Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickFillDemo('admin')}
              className="px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-[11px] text-sky-800 font-semibold hover:bg-sky-100 transition"
            >
              Fill Demo Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
