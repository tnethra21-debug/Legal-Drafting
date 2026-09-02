// frontend/src/components/Navbar.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import {
  Scale,
  Flame,
  Zap,
  Award,
  BookOpen,
  FolderKanban,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export const Navbar = ({ currentScreen, onNavigate }) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getLevelBadge = (levelId) => {
    switch (levelId) {
      case 'ADVANCED':
        return { label: 'Advanced', badge: '🏆', color: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'MEDIUM':
        return { label: 'Medium', badge: '⚡', color: 'bg-sky-50 text-sky-700 border-sky-200' };
      default:
        return { label: 'Basic', badge: '🌱', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    }
  };

  const levelInfo = getLevelBadge(user?.currentLevelId || 'BASIC');

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 p-0.5 shadow-sm shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Scale className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
              Legal<span className="text-amber-600">Draft</span>
            </span>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-500 block -mt-1">
              Learning Platform
            </span>
          </div>
        </div>

        {/* Navigation Links (When Logged In) */}
        {user && (
          <div className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 text-xs font-semibold">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                currentScreen === 'dashboard'
                  ? 'bg-white text-amber-700 font-bold shadow-xs border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('basics')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                currentScreen === 'basics' || currentScreen === 'quiz-gate'
                  ? 'bg-white text-amber-700 font-bold shadow-xs border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
              Basics & Quiz
            </button>
            <button
              onClick={() => onNavigate('domains')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                ['domains', 'scenarios', 'workspace'].includes(currentScreen)
                  ? 'bg-white text-amber-700 font-bold shadow-xs border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              Practice
            </button>
            <button
              onClick={() => onNavigate('portfolio')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                currentScreen === 'portfolio'
                  ? 'bg-white text-amber-700 font-bold shadow-xs border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5 text-emerald-600" />
              Portfolio
            </button>
            <button
              onClick={() => onNavigate('certificate')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                currentScreen === 'certificate'
                  ? 'bg-white text-amber-700 font-bold shadow-xs border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-purple-600" />
              Certificate
            </button>
          </div>
        )}

        {/* Right Section: Stats & User */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Gamification Stats: Level Badge */}
              <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${levelInfo.color}`}>
                <span>{levelInfo.badge}</span>
                <span>{levelInfo.label}</span>
              </div>

              {/* XP Counter */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
                <span>⚡</span>
                <span>{user.xp || 0} XP</span>
              </div>

              {/* Streak */}
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>{user.streakDays || 1}d</span>
              </div>

              {/* User Dropdown / Logout */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 font-medium"
                  title={user.name}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-amber-700 font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden lg:inline max-w-[110px] truncate">{user.name}</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    onNavigate('landing');
                  }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 text-slate-600 hover:text-slate-900"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </>
          ) : (
            /* Guest actions */
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('auth', { mode: 'login' })}
                className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 transition px-3 py-1.5"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate('auth', { mode: 'register' })}
                className="btn-gold text-xs px-4 py-2 rounded-xl font-bold shadow-sm"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && user && (
        <div className="md:hidden pt-3 pb-2 border-t border-slate-200 mt-3 flex flex-col gap-1 text-sm font-medium bg-white">
          <button
            onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
            className="text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            Dashboard
          </button>
          <button
            onClick={() => { onNavigate('basics'); setMobileMenuOpen(false); }}
            className="text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            Drafting Basics (8 Lessons)
          </button>
          <button
            onClick={() => { onNavigate('domains'); setMobileMenuOpen(false); }}
            className="text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            Practice Scenarios
          </button>
          <button
            onClick={() => { onNavigate('portfolio'); setMobileMenuOpen(false); }}
            className="text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            Drafting Portfolio
          </button>
          <button
            onClick={() => { onNavigate('certificate'); setMobileMenuOpen(false); }}
            className="text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            Certificate of Completion
          </button>
        </div>
      )}
    </nav>
  );
};
