// frontend/src/components/Navbar.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import {
  Scale,
  Flame,
  Zap,
  Globe,
  Award,
  BookOpen,
  FolderKanban,
  LogOut,
  User,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';

export const Navbar = ({ currentScreen, onNavigate }) => {
  const { user, logout } = useAuth();
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getLevelBadge = (levelId) => {
    switch (levelId) {
      case 'ADVANCED':
        return { label: 'Advanced', badge: '🏆', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      case 'MEDIUM':
        return { label: 'Medium', badge: '⚡', color: 'bg-sky-500/20 text-sky-300 border-sky-500/30' };
      default:
        return { label: 'Basic', badge: '🌱', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
    }
  };

  const levelInfo = getLevelBadge(user?.currentLevelId || 'BASIC');

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Scale className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              Legal<span className="text-amber-400">Draft</span>
            </span>
            <span className="text-[10px] font-medium tracking-wider uppercase text-slate-400 block -mt-1">
              Learning Platform
            </span>
          </div>
        </div>

        {/* Navigation Links (When Logged In) */}
        {user && (
          <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/60 text-sm">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                currentScreen === 'dashboard'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('basics')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                currentScreen === 'basics' || currentScreen === 'quiz-gate'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
              Basics & Quiz
            </button>
            <button
              onClick={() => onNavigate('domains')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                ['domains', 'scenarios', 'workspace'].includes(currentScreen)
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-400" />
              Practice
            </button>
            <button
              onClick={() => onNavigate('portfolio')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                currentScreen === 'portfolio'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <FolderKanban className="w-4 h-4 text-emerald-400" />
              Portfolio
            </button>
            <button
              onClick={() => onNavigate('certificate')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                currentScreen === 'certificate'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Award className="w-4 h-4 text-purple-400" />
              Certificate
            </button>
          </div>
        )}

        {/* Right Section: Stats, Language & User */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Gamification Stats: Level Badge */}
              <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${levelInfo.color}`}>
                <span>{levelInfo.badge}</span>
                <span>{levelInfo.label}</span>
              </div>

              {/* XP Counter */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-inner">
                <span className="text-sm">⚡</span>
                <span>{user.xp || 0} XP</span>
              </div>

              {/* Streak */}
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>{user.streakDays || 1}d</span>
              </div>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition"
                  title="Switch Language"
                >
                  <Globe className="w-3.5 h-3.5 text-sky-400" />
                  <span className="uppercase">{currentLanguage}</span>
                </button>
                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-1 z-50">
                    {[
                      { code: 'en', name: 'English', flag: '🇬🇧' },
                      { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
                      { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
                    ].map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-slate-800 transition ${
                          currentLanguage === lang.code ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-slate-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                        {currentLanguage === lang.code && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Dropdown / Logout */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-2 text-xs text-slate-300 hover:text-white"
                  title={user.name}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden lg:inline font-medium max-w-[100px] truncate">{user.name}</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    onNavigate('landing');
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 text-slate-400 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </>
          ) : (
            /* Guest actions */
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('auth', { mode: 'login' })}
                className="text-sm font-medium text-slate-300 hover:text-white transition px-3 py-1.5"
              >
                {t('login')}
              </button>
              <button
                onClick={() => onNavigate('auth', { mode: 'register' })}
                className="btn-gold text-xs px-4 py-2 rounded-xl shadow-lg shadow-amber-500/20 font-bold"
              >
                {t('getStarted')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && user && (
        <div className="md:hidden pt-3 pb-2 border-t border-slate-800/80 mt-3 flex flex-col gap-1 text-sm">
          <button
            onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
            className="text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900"
          >
            Dashboard
          </button>
          <button
            onClick={() => { onNavigate('basics'); setMobileMenuOpen(false); }}
            className="text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900"
          >
            Drafting Basics (8 Lessons)
          </button>
          <button
            onClick={() => { onNavigate('domains'); setMobileMenuOpen(false); }}
            className="text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900"
          >
            Practice Scenarios
          </button>
          <button
            onClick={() => { onNavigate('portfolio'); setMobileMenuOpen(false); }}
            className="text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900"
          >
            Drafting Portfolio
          </button>
          <button
            onClick={() => { onNavigate('certificate'); setMobileMenuOpen(false); }}
            className="text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900"
          >
            Certificate of Completion
          </button>
        </div>
      )}
    </nav>
  );
};
