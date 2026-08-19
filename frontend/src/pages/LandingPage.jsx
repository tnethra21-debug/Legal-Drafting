// frontend/src/pages/LandingPage.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import {
  Scale,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  FileCheck2,
  Cpu,
  Layers,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

export const LandingPage = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen mesh-gradient-bg text-slate-100 flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Glowing Ambient Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-lg shadow-amber-500/5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            AI-Powered Legal Drafting for Law Students
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            Master the Art of <br />
            <span className="gold-gradient-text">Precision Legal Drafting</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
            Transition from legal theory to real courtroom practice. Write authentic plaints, bail applications,
            statutory notices, and agreements with <strong className="text-amber-300">Grounded AI evaluation</strong> and rubric-driven feedback.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => onNavigate('auth', { mode: 'register' })}
              className="w-full sm:w-auto btn-gold px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20"
            >
              <span>{t('getStarted')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('auth', { mode: 'login' })}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition"
            >
              {t('login')}
            </button>
          </div>

          {/* Sub-text stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> BNS 2023 & BNSS 2023 Updated
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> CPC 1908 & TPA 1882 Rubrics
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Multilingual: English, தமிழ், हिन्दी
            </span>
          </div>
        </div>

        {/* The Core Learning Loop Diagram */}
        <div className="mt-16 glass-card p-6 sm:p-8 max-w-5xl mx-auto border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
              Methodology
            </span>
            <h2 className="text-2xl font-bold text-white">The Progressive Skill Loop</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-center text-xs">
            {[
              { step: '1', title: 'Learn', desc: '8 Theory Lessons', icon: '📚' },
              { step: '2', title: 'Practice', desc: 'Real Scenarios', icon: '⚖️' },
              { step: '3', title: 'Draft', desc: 'Live Editor', icon: '✍️' },
              { step: '4', title: 'AI Review', desc: 'Rubric Scoring', icon: '🤖' },
              { step: '5', title: 'Improve', desc: 'Target Weakness', icon: '🔍' },
              { step: '6', title: 'Redraft', desc: 'Multi-versions', icon: '📝' },
              { step: '7', title: 'Level Test', desc: 'Prove Skill', icon: '🎯' },
              { step: '8', title: 'Unlock', desc: 'Higher Tiers', icon: '🏆' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900/70 p-3 rounded-xl border border-slate-800/80 flex flex-col items-center justify-center hover:border-amber-500/40 transition group"
              >
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="font-bold text-slate-200">{item.title}</div>
                <div className="text-[10px] text-slate-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
          <div className="glass-card-interactive p-6 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Grounded AI Feedback</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              No generic bot answers. Evaluates draft clarity, structural parts, statutory citations, and missing clauses against verified legal sources.
            </p>
          </div>

          <div className="glass-card-interactive p-6 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Adaptive Progression</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Diagnostic test automatically places you into Basic 🌱, Medium ⚡, or Advanced 🏆 tiers. Unlock higher domains only by demonstrating drafting competence.
            </p>
          </div>

          <div className="glass-card-interactive p-6 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Portfolio & Certification</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Build an employer-ready practical drafting portfolio with revision history and earn verifiable legal completion certificates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
