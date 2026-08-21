// frontend/src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import {
  Scale,
  Lock,
  Mail,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

const AuthPage = ({ onNavigate }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please enter your email and password.');
      }

      const res = await login(email, password);

      if (!res?.success) {
        throw new Error(res?.message || 'Invalid email or password.');
      }

      if (res.user?.isDiagnosticCompleted) {
        onNavigate('dashboard');
      } else {
        onNavigate('language-select');
      }
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef1f7] px-4 relative overflow-hidden">

      {/* Clay Decorations */}
      <div className="absolute top-10 left-8 w-28 h-28 rounded-[35%] bg-[#eef1f7]
        shadow-[10px_10px_20px_rgba(0,0,0,.1),-10px_-10px_20px_rgba(255,255,255,.9)]
        rotate-12" />

      <div className="absolute top-24 right-10 w-20 h-20 rounded-full bg-[#eef1f7]
        shadow-[8px_8px_16px_rgba(0,0,0,.1),-8px_-8px_16px_rgba(255,255,255,.9)]" />

      <div className="w-full max-w-md relative z-10">

        {/* Brand */}
        <div className="text-center mb-7">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center
            rounded-[22px] bg-[#eef1f7] text-violet-600
            shadow-[9px_9px_18px_rgba(0,0,0,.12),-9px_-9px_18px_rgba(255,255,255,.95)]">
            <Scale size={30} strokeWidth={2.2} />
          </div>

          <h1 className="text-3xl font-extrabold text-slate-800">
            LegalDraft
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Learn • Practice • Draft • Improve
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-[30px] bg-[#eef1f7] p-7 sm:p-8
          shadow-[18px_18px_35px_rgba(0,0,0,.12),-18px_-18px_35px_rgba(255,255,255,.95)]">

          {/* Heading */}
          <div className="text-center mb-7">
            <h2 className="text-2xl font-extrabold text-slate-800">
              Welcome Back
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Continue your legal drafting journey.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-center gap-2 rounded-2xl bg-red-100
              px-4 py-3 text-sm text-red-600">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your email"
                  className="w-full rounded-2xl bg-[#eef1f7] py-3.5 pl-11 pr-4
                    text-sm text-slate-800 outline-none
                    shadow-[inset_5px_5px_10px_rgba(0,0,0,.08),inset_-5px_-5px_10px_rgba(255,255,255,.9)]
                    focus:ring-2 focus:ring-violet-300"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl bg-[#eef1f7] py-3.5 pl-11 pr-4
                    text-sm text-slate-800 outline-none
                    shadow-[inset_5px_5px_10px_rgba(0,0,0,.08),inset_-5px_-5px_10px_rgba(255,255,255,.9)]
                    focus:ring-2 focus:ring-violet-300"
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  setError('Password recovery will be available soon.')
                }
                className="text-xs font-semibold text-violet-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl
                bg-violet-500 py-3.5 text-sm font-extrabold text-white
                shadow-[8px_8px_16px_rgba(0,0,0,.13),-8px_-8px_16px_rgba(255,255,255,.8)]
                transition hover:-translate-y-0.5 hover:bg-violet-600
                disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>
                {loading ? 'Logging in...' : 'Login'}
              </span>

              {!loading && <ArrowRight size={19} />}
            </button>
          </form>

          {/* Get Started */}
          <div className="mt-7 text-center text-sm text-slate-500">
            <span>New to LegalDraft?</span>

            <button
              type="button"
              onClick={() =>
                setError('Registration will be available soon.')
              }
              className="ml-1 font-bold text-violet-600 hover:underline"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-slate-400">
          AI-powered legal drafting learning platform
        </p>

      </div>
    </div>
  );
};

export { AuthPage };
export default AuthPage;
