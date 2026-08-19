// frontend/src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { api } from '../services/api.js';
import { ProgressBar } from '../components/ProgressBar.jsx';
import {
  Scale,
  Zap,
  BookOpen,
  Award,
  Flame,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  FileText,
  Clock,
  Sparkles,
  HelpCircle,
  FolderKanban
} from 'lucide-react';

export const DashboardPage = ({ onNavigate }) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const res = await api.getLearningPath();
        if (res.success && res.roadmap) {
          setRoadmap(res.roadmap);
        }
      } catch (err) {
        console.warn('Dashboard roadmap fetch fallback:', err.message);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  const currentLevelId = user?.currentLevelId || 'BASIC';
  const unlockedLevels = user?.unlockedLevels || ['BASIC'];

  const getLevelDetails = (lvl) => {
    switch (lvl) {
      case 'ADVANCED':
        return { name: 'Advanced Level 🏆', badge: '🏆', desc: 'Complex multi-party disputes, appellate drafting & legislative drafting.' };
      case 'MEDIUM':
        return { name: 'Medium Level ⚡', badge: '⚡', desc: 'Multi-issue factual analysis, statutory notices, and commercial leases.' };
      default:
        return { name: 'Basic Level 🌱', badge: '🌱', desc: 'Guided practice with simple facts, legal notices, and tenancy agreements.' };
    }
  };

  const levelInfo = getLevelDetails(currentLevelId);

  return (
    <div className="min-h-screen mesh-gradient-bg text-slate-100 py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="glass-card p-6 sm:p-8 border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Learner Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Welcome back, {user?.name || 'Counsel'}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {user?.institution || 'Faculty of Law'} • Track your progressive drafting curriculum
            </p>
          </div>

          {/* Stat Pills */}
          <div className="flex items-center gap-3 flex-wrap relative z-10">
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl font-bold">
                ⚡
              </div>
              <div>
                <div className="text-xs text-slate-400 font-semibold">Total XP</div>
                <div className="text-lg font-black text-amber-400">{user?.xp || 0} XP</div>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 text-xl font-bold">
                🔥
              </div>
              <div>
                <div className="text-xs text-slate-400 font-semibold">Streak</div>
                <div className="text-lg font-black text-rose-400">{user?.streakDays || 1} Days</div>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 text-xl font-bold">
                {levelInfo.badge}
              </div>
              <div>
                <div className="text-xs text-slate-400 font-semibold">Assigned Tier</div>
                <div className="text-sm font-black text-sky-300">{levelInfo.name}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Roadmap & Practice Launcher */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Personalized Learning Path Roadmap */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 sm:p-8 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-400" />
                    Personalized Learning Path
                  </h2>
                  <p className="text-xs text-slate-400">Strict backend-enforced progression sequence</p>
                </div>
                <button
                  onClick={() => onNavigate('basics')}
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <span>Resume Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {/* Step 1: Drafting Basics */}
                <div
                  onClick={() => onNavigate('basics')}
                  className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                        1. Drafting Basics Theory
                      </h3>
                      <p className="text-xs text-slate-400">8 foundational lessons on legal drafting principles & anatomy</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      Available
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition" />
                  </div>
                </div>

                {/* Step 2: Quiz Gate */}
                <div
                  onClick={() => onNavigate('quiz-gate')}
                  className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                      🧠
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                        2. Drafting Basics Quiz Gate
                      </h3>
                      <p className="text-xs text-slate-400">10 questions • 70% passing threshold to unlock practical scenarios</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                      Required Gate
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition" />
                  </div>
                </div>

                {/* Step 3: Current Level Practice */}
                <div
                  onClick={() => onNavigate('domains')}
                  className="p-4 rounded-2xl bg-slate-900/70 border border-amber-500/30 shadow-lg shadow-amber-500/5 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                          3. {levelInfo.name} Practical Scenarios
                        </h3>
                        <span className="text-[10px] font-bold bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-500/30">
                          Active Tier
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">Choose between Civil, Criminal (BNS/BNSS), or Conveyancing</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </div>

                {/* Step 4: Level Progression Test */}
                <div
                  onClick={() => onNavigate('level-test', { level: currentLevelId })}
                  className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
                      🎯
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition">
                        4. {levelInfo.name} Advancement Test
                      </h3>
                      <p className="text-xs text-slate-400">Demonstrate mastery to unlock next higher level tier</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                      Level Test
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition" />
                  </div>
                </div>

                {/* Step 5: Final Assessment & Certificate */}
                <div
                  onClick={() => onNavigate('final-assessment')}
                  className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-amber-500/40 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-bold">
                      <Award className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-200 group-hover:text-amber-300 transition">
                        5. Final Comprehensive Assessment & Certificate
                      </h3>
                      <p className="text-xs text-slate-400">Complete multi-section exam to earn verified certification</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">
                    Cap-stone
                  </span>
                </div>
              </div>
            </div>

            {/* Domain Quick Launch Cards */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">Choose Your Practice Domain ({levelInfo.name})</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    id: 'civil',
                    name: 'Civil & Litigation',
                    icon: '⚖️',
                    desc: 'Legal notices, plaints, and affidavits under CPC 1908.'
                  },
                  {
                    id: 'criminal',
                    name: 'Criminal Law (BNS & BNSS)',
                    icon: '🏛️',
                    desc: 'Complaints & bail petitions under new criminal codes.'
                  },
                  {
                    id: 'conveyancing',
                    name: 'Conveyancing & Property',
                    icon: '📄',
                    desc: 'Tenancy deeds, commercial leases & contracts.'
                  }
                ].map((d) => (
                  <div
                    key={d.id}
                    onClick={() => onNavigate('scenarios', { domainId: d.id, levelId: currentLevelId })}
                    className="glass-card-interactive p-5 border border-slate-800 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-3xl mb-3">{d.icon}</div>
                      <h4 className="font-bold text-white text-sm mb-1">{d.name}</h4>
                      <p className="text-xs text-slate-400">{d.desc}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs font-bold text-amber-400">
                      <span>View Scenarios</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Quick Shortcuts & Badges */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="glass-card p-6 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-700 flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2">
                    <FolderKanban className="w-4 h-4 text-emerald-400" />
                    Open My Drafting Portfolio
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>

                <button
                  onClick={() => onNavigate('certificate')}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-700 flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-400" />
                    View Certificate Status
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>

                <button
                  onClick={() => onNavigate('language-select')}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-700 flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-sky-400" />
                    Change Instruction Language
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Achievements & Badges Showcase */}
            <div className="glass-card p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Your Achievements</h3>
                <span className="text-xs text-amber-400 font-bold">{user?.badges?.length || 1} Earned</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { id: 'first_lesson', name: 'First Lesson', icon: '📚', unlocked: true },
                  { id: 'quiz_master', name: 'Quiz Master', icon: '🧠', unlocked: user?.badges?.includes('quiz_master') },
                  { id: 'civil_drafter', name: 'Civil Litigator', icon: '⚖️', unlocked: user?.badges?.includes('civil_drafter') },
                  { id: 'criminal_drafter', name: 'Criminal Pro', icon: '🏛️', unlocked: user?.badges?.includes('criminal_drafter') },
                  { id: 'conveyancing_pro', name: 'Deed Master', icon: '📄', unlocked: user?.badges?.includes('conveyancing_pro') },
                  { id: 'redraft_champion', name: 'Iterative Drafter', icon: '✍️', unlocked: user?.badges?.includes('redraft_champion') },
                  { id: 'level_master', name: 'Level Conqueror', icon: '⚡', unlocked: user?.badges?.includes('level_master') },
                  { id: 'legal_scholar', name: 'Drafting Master', icon: '👑', unlocked: user?.badges?.includes('legal_scholar') }
                ].map((b) => (
                  <div
                    key={b.id}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center ${
                      b.unlocked
                        ? 'bg-amber-500/10 border-amber-500/30 text-white'
                        : 'bg-slate-900/40 border-slate-800/40 text-slate-600 opacity-40'
                    }`}
                    title={b.name}
                  >
                    <div className="text-2xl mb-1">{b.icon}</div>
                    <div className="text-[9px] font-semibold truncate w-full">{b.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
