// frontend/src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { Scale, Lock, Mail, User, Building, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

export const AuthPage = ({ mode = 'login', onNavigate }) => {
  const { login, register } = useAuth();
  const { t } = useLanguage();
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
          // If student has not completed language or diagnostic, take to onboarding
          if (!res.user.isDiagnosticCompleted) {
            onNavigate('language-select');
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
          onNavigate('language-select');
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
      <div className="w-full max-w-md glass-card p-6 sm:p-8 border border-slate-800 shadow-2xl relative">
        {/* Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-500/20 blur-3xl rounded-full pointer-events-none" />

        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-300 p-0.5 mx-auto mb-3 shadow-lg shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Scale className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? 'Welcome Back to LegalDraft' : 'Create Law Student Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isLogin ? 'Enter your credentials to continue drafting' : 'Start your progressive legal drafting journey'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-800 mb-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`flex-1 py-2 rounded-lg transition ${
              isLogin ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('login')}
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`flex-1 py-2 rounded-lg transition ${
              !isLogin ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('createAccount')}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-4">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Legal Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Aditya Sharma"
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Law College / University</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="e.g. National Law School of India"
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@lawcollege.edu"
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Confirm Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 mt-4 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : isLogin ? t('login') : t('createAccount')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Quick-Fill Pill */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 mb-2">Quick demo test accounts:</p>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handleQuickFillDemo('student')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-amber-300 hover:bg-slate-800 transition"
            >
              Fill Demo Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickFillDemo('admin')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-sky-300 hover:bg-slate-800 transition"
            >
              Fill Demo Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
