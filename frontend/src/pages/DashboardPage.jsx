// frontend/src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
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
  FolderKanban,
  Target
} from 'lucide-react';

export const DashboardPage = ({ onNavigate }) => {
  const { user } = useAuth();

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
    <div className="min-h-screen mesh-gradient-bg text-slate-900 py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Learner Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900">
              Welcome back, {user?.name || 'Counsel'}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              {user?.institution || 'Faculty of Law'} • Track your progressive drafting curriculum
            </p>
          </div>

          {/* Stat Pills */}
          <div className="flex items-center gap-3 flex-wrap relative z-10">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 text-xl font-bold">
                ⚡
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold">Total XP</div>
                <div className="text-lg font-black text-amber-700">{user?.xp || 0} XP</div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 text-xl font-bold">
                🔥
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold">Streak</div>
                <div className="text-lg font-black text-rose-700">{user?.streakDays || 1} Days</div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 text-xl font-bold">
                {levelInfo.badge}
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold">Assigned Tier</div>
                <div className="text-sm font-black text-sky-800">{levelInfo.name}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Roadmap & Practice Launcher */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Personalized Learning Path Roadmap */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-600" />
                    Personalized Learning Path
                  </h2>
                  <p className="text-xs text-slate-500">Strict backend-enforced progression sequence</p>
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
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 cursor-pointer transition flex items-center justify-between group shadow-xs"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition">
                        1. Drafting Basics Theory
                      </h3>
                      <p className="text-xs text-slate-500">8 foundational lessons on legal drafting principles & anatomy</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Available
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition" />
                  </div>
                </div>

                {/* Step 2: Quiz Gate */}
                <div
                  onClick={() => onNavigate('quiz-gate')}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 cursor-pointer transition flex items-center justify-between group shadow-xs"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-bold">
                      🧠
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition">
                        2. Drafting Basics Quiz Gate
                      </h3>
                      <p className="text-xs text-slate-500">10 questions • 70% passing threshold to unlock practical scenarios</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      Required Gate
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition" />
                  </div>
                </div>

                {/* Step 3: Current Level Practice */}
                <div
                  onClick={() => onNavigate('domains')}
                  className="p-4 rounded-2xl bg-amber-50/40 border border-amber-300 shadow-sm cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 font-bold">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition">
                          3. {levelInfo.name} Practical Scenarios
                        </h3>
                        <span className="text-[10px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full border border-sky-200">
                          Active Tier
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">Choose between Civil, Criminal (BNS/BNSS), or Conveyancing</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-600" />
                </div>

                {/* Step 4: Level Progression Test */}
                <div
                  onClick={() => onNavigate('level-test', { level: currentLevelId })}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 hover:bg-purple-50/30 cursor-pointer transition flex items-center justify-between group shadow-xs"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 font-bold">
                      🎯
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-800 transition">
                        4. {levelInfo.name} Advancement Test
                      </h3>
                      <p className="text-xs text-slate-500">Demonstrate mastery to unlock next higher level tier</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                      Level Test
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition" />
                  </div>
                </div>

                {/* Step 5: Final Assessment & Certificate */}
                <div
                  onClick={() => onNavigate('final-assessment')}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 cursor-pointer transition flex items-center justify-between group shadow-xs"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-bold">
                      <Award className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 group-hover:text-amber-800 transition">
                        5. Final Comprehensive Assessment & Certificate
                      </h3>
                      <p className="text-xs text-slate-500">Complete multi-section exam to earn verified certification</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                    Cap-stone
                  </span>
                </div>
              </div>
            </div>

            {/* Domain Quick Launch Cards */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900">Choose Your Practice Domain ({levelInfo.name})</h3>
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
                    className="glass-card-interactive p-5 border border-slate-200 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-3xl mb-3">{d.icon}</div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">{d.name}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{d.desc}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs font-bold text-amber-700">
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
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2">
                    <FolderKanban className="w-4 h-4 text-emerald-600" />
                    Open My Drafting Portfolio
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => onNavigate('certificate')}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-600" />
                    View Certificate Status
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => onNavigate('basics')}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-sky-600" />
                    Review Drafting Fundamentals
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Achievements & Badges Showcase */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Your Achievements</h3>
                <span className="text-xs text-amber-700 font-bold">{user?.badges?.length || 1} Earned</span>
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
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center ${b.unlocked
                        ? 'bg-amber-50 border-amber-200 text-slate-900 shadow-2xs'
                        : 'bg-slate-50 border-slate-200/60 text-slate-400 opacity-40'
                      }`}
                    title={b.name}
                  >
                    <div className="text-2xl mb-1">{b.icon}</div>
                    <div className="text-[9px] font-semibold truncate w-full text-slate-700">{b.name}</div>
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
