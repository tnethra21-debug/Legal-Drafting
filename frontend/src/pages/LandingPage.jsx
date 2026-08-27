// frontend/src/pages/LandingPage.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  Cpu,
  Layers,
  ShieldCheck,
  BookOpen,
  FileCheck2,
  TrendingUp,
} from 'lucide-react';

export const LandingPage = ({ onNavigate }) => {
  const { t } = useLanguage();

  const learningSteps = [
    { title: 'Learn', desc: '8 Theory Lessons', icon: '📚' },
    { title: 'Practice', desc: 'Real Scenarios', icon: '⚖️' },
    { title: 'Draft', desc: 'Live Editor', icon: '✍️' },
    { title: 'AI Review', desc: 'Rubric Scoring', icon: '🤖' },
    { title: 'Improve', desc: 'Target Weakness', icon: '🔍' },
    { title: 'Redraft', desc: 'Multi-versions', icon: '📝' },
    { title: 'Level Test', desc: 'Prove Skill', icon: '🎯' },
    { title: 'Unlock', desc: 'Higher Tiers', icon: '🏆' },
  ];

  const features = [
    {
      icon: Cpu,
      title: 'Grounded AI Feedback',
      text:
        'No generic bot answers. Evaluate draft clarity, structural parts, statutory citations, and missing clauses against verified legal sources.',
      iconClass: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    {
      icon: Layers,
      title: 'Adaptive Progression',
      text:
        'Diagnostic tests automatically place you into Basic 🌱, Medium ⚡, or Advanced 🏆 tiers based on your drafting competence.',
      iconClass: 'bg-sky-50 text-sky-600 border-sky-200',
    },
    {
      icon: Award,
      title: 'Portfolio & Certification',
      text:
        'Build an employer-ready practical drafting portfolio with revision history and earn verifiable legal completion certificates.',
      iconClass: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      {/* Soft Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-amber-100/50 blur-[120px] rounded-full" />
        <div className="absolute top-40 -right-32 w-96 h-96 bg-sky-100/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-100/30 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10">
        {/* HERO */}
        <section className="px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-16">
          <div className="max-w-7xl mx-auto">

            {/* Top Badge */}
            <div className="flex justify-center mb-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs sm:text-sm font-semibold shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                AI-Powered Legal Drafting for Law Students
              </div>
            </div>

            {/* Main Heading */}
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-slate-900">
                Master the Art of
                <br />
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                  Precision Legal Drafting
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Transition from legal theory to real courtroom practice.
                Write authentic plaints, bail applications, statutory notices,
                and agreements with{' '}
                <strong className="text-slate-900">
                  Grounded AI evaluation
                </strong>{' '}
                and rubric-driven feedback.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-9">
                <button
                  onClick={() =>
                    onNavigate('auth', { mode: 'register' })
                  }
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  {t('getStarted')}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() =>
                    onNavigate('auth', { mode: 'login' })
                  }
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-semibold text-sm shadow-sm transition-all duration-200"
                >
                  {t('login')}
                </button>
              </div>

              {/* Legal Standards */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-10 text-xs sm:text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  BNS 2023 & BNSS 2023 Updated
                </span>

                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  CPC 1908 & TPA 1882 Rubrics
                </span>

                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  English, தமிழ், हिन्दी
                </span>
              </div>
            </div>

            {/* TRUST STRIP */}
            <div className="max-w-5xl mx-auto mt-14">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-800">
                    Legal Standards
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Structured learning
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                  <BookOpen className="w-6 h-6 text-sky-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-800">
                    Practical Learning
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Real drafting tasks
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                  <FileCheck2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-800">
                    AI Evaluation
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Rubric-based feedback
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                  <TrendingUp className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-800">
                    Skill Progress
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Track improvement
                  </p>
                </div>
              </div>
            </div>

            {/* LEARNING LOOP */}
            <section className="mt-16 max-w-6xl mx-auto">
              <div className="rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl shadow-slate-200/50 p-5 sm:p-8">

                <div className="text-center mb-8">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                    Methodology
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                    The Progressive Skill Loop
                  </h2>

                  <p className="text-sm text-slate-500 mt-2">
                    Learn, practice, evaluate, improve, and advance.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {learningSteps.map((item, index) => (
                    <div
                      key={item.title}
                      className="group bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 rounded-xl p-3 min-h-[125px] flex flex-col items-center justify-center text-center transition-all duration-200"
                    >
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>

                      <div className="text-xs text-amber-600 font-bold mb-1">
                        STEP {index + 1}
                      </div>

                      <div className="font-bold text-sm text-slate-800">
                        {item.title}
                      </div>

                      <div className="text-[10px] text-slate-500 mt-1">
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FEATURES */}
            <section className="mt-14 max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                  Platform Features
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                  Everything You Need to Draft Better
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${feature.iconClass}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {feature.title}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {feature.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* FINAL CTA */}
            <section className="mt-14 max-w-6xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-white to-sky-50 border border-amber-100 p-8 sm:p-12 text-center shadow-lg">

                <div className="absolute -top-20 -right-20 w-56 h-56 bg-amber-200/30 blur-3xl rounded-full" />
                <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-sky-200/30 blur-3xl rounded-full" />

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 text-amber-600 mb-4">
                    <Sparkles className="w-6 h-6" />
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Ready to Build Your Legal Drafting Skills?
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-3 mb-7">
                    Start with a diagnostic assessment and let the platform
                    personalize your learning journey.
                  </p>

                  <button
                    onClick={() =>
                      onNavigate('auth', { mode: 'register' })
                    }
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    Start Learning
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

          </div>
        </section>
      </main>
    </div>
  );
};