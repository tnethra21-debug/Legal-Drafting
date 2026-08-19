// frontend/src/pages/DraftingBasicsPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { api } from '../services/api.js';
import { ProgressBar } from '../components/ProgressBar.jsx';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lightbulb,
  AlertTriangle,
  Scale,
  Award
} from 'lucide-react';

export const DraftingBasicsPage = ({ onNavigate }) => {
  const { user, addXPLocally } = useAuth();
  const { currentLanguage } = useLanguage();

  const [lessons, setLessons] = useState([]);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await api.getLessons();
        if (res.success && res.lessons) {
          setLessons(res.lessons);
        }
      } catch (err) {
        console.warn('Fallback loading lessons:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  const currentLesson = lessons[selectedLessonIndex] || {
    id: 'lesson-1',
    order: 1,
    title: 'What is Legal Drafting?',
    summary: 'Introduction to legal drafting as the disciplined art of preparing binding legal instruments.',
    content: {
      intro: 'Legal drafting is the process of synthesizing legal principles, factual instructions, and client objectives into clear, precise, and enforceable documents.',
      keyIdeas: [
        'Transforms client instructions into legally operative instruments.',
        'Prevents future litigation by eliminating ambiguities.',
        'Governed by procedural codes (CPC, BNSS) and substantive statutes.'
      ],
      example: {
        title: 'Drafting vs Casual Writing',
        badText: '"John gave money to Raj and wants it back soon."',
        goodText: '"Under the Loan Agreement dated 12.01.2025, the Borrower is in default of repayment of ₹5,00,000/-."'
      },
      takeaway: 'Precision in legal drafting creates certainty of rights and liabilities.'
    }
  };

  const handleCompleteLesson = async () => {
    try {
      await api.completeLesson(currentLesson.id);
      addXPLocally(10);

      // Update local completed state
      setLessons(prev =>
        prev.map((l, idx) => (idx === selectedLessonIndex ? { ...l, isCompleted: true } : l))
      );

      if (selectedLessonIndex < lessons.length - 1) {
        setSelectedLessonIndex(selectedLessonIndex + 1);
      }
    } catch (err) {
      console.warn('Local complete:', err.message);
      if (selectedLessonIndex < lessons.length - 1) {
        setSelectedLessonIndex(selectedLessonIndex + 1);
      }
    }
  };

  const completedCount = lessons.filter(l => l.isCompleted).length;
  const progressPct = ((completedCount) / (lessons.length || 8)) * 100;
  const allLessonsDone = completedCount >= lessons.length && lessons.length > 0;

  // Localized lesson title
  const localizedTitle = currentLanguage === 'ta' && currentLesson.title_ta
    ? currentLesson.title_ta
    : currentLanguage === 'hi' && currentLesson.title_hi
    ? currentLesson.title_hi
    : currentLesson.title;

  return (
    <div className="min-h-screen mesh-gradient-bg text-slate-100 py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 border border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Foundation Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Drafting Basics (8 Lessons)
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Core legal drafting fundamentals common to all practice domains
            </p>
          </div>

          {/* Progress gauge & Quiz gate CTA */}
          <div className="flex flex-col sm:items-end gap-2">
            <div className="w-48">
              <ProgressBar
                progress={progressPct}
                label={`Progress: ${completedCount}/${lessons.length || 8} Lessons`}
              />
            </div>
            {allLessonsDone && (
              <button
                onClick={() => onNavigate('quiz-gate')}
                className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
              >
                <span>Ready for Quiz Gate!</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Two-Column Grid: Lesson Navigation & Lesson Content Card */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar: 8 Lessons List */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
              Course Outline
            </div>
            {lessons.map((lesson, idx) => {
              const isSelected = selectedLessonIndex === idx;
              const isCompleted = lesson.isCompleted;

              return (
                <div
                  key={lesson.id}
                  onClick={() => setSelectedLessonIndex(idx)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : isSelected
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-snug">
                        {currentLanguage === 'ta' && lesson.title_ta
                          ? lesson.title_ta
                          : currentLanguage === 'hi' && lesson.title_hi
                          ? lesson.title_hi
                          : lesson.title}
                      </div>
                      <div className="text-[10px] text-slate-400">Lesson {idx + 1} of 8</div>
                    </div>
                  </div>

                  {isCompleted && (
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      Done
                    </span>
                  )}
                </div>
              );
            })}

            {/* Quiz Gate Trigger in Sidebar */}
            <div
              onClick={() => onNavigate('quiz-gate')}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                allLessonsDone
                  ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-amber-500 text-amber-300 shadow-lg'
                  : 'bg-slate-900/30 border-slate-800/50 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 text-base">
                  🧠
                </div>
                <div>
                  <div className="text-xs font-bold">Quiz Gate (10 Questions)</div>
                  <div className="text-[10px]">Passing Score: 70%</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Right Main Content Card */}
          <div className="lg:col-span-8">
            <div className="glass-card p-6 sm:p-8 border border-slate-800 space-y-6">
              {/* Lesson header */}
              <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Lesson {selectedLessonIndex + 1} of 8</span>
                  <span className="font-semibold text-amber-400">+10 XP</span>
                </div>
                <h2 className="text-2xl font-black text-white">{localizedTitle}</h2>
                <p className="text-xs text-slate-300 mt-1">{currentLesson.summary}</p>
              </div>

              {/* Introduction */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-sm text-slate-200 leading-relaxed">
                {currentLesson.content?.intro}
              </div>

              {/* Key Ideas */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  Key Drafting Ideas 💡
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {(currentLesson.content?.keyIdeas || []).map((idea, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5"
                    >
                      <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span className="leading-relaxed">{idea}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bad vs Good Example Comparison */}
              {currentLesson.content?.example && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Scale className="w-4 h-4 text-sky-400" />
                    {currentLesson.content.example.title}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 text-slate-300">
                      <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1.5">
                        ❌ Avoid (Ambiguous / Casual)
                      </span>
                      <p className="font-mono text-xs leading-relaxed text-rose-200/90">
                        {currentLesson.content.example.badText}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-slate-300">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1.5">
                        ✓ Preferred (Precise & Enforceable)
                      </span>
                      <p className="font-mono text-xs leading-relaxed text-emerald-200/90">
                        {currentLesson.content.example.goodText}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Takeaway */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-semibold flex items-center gap-3">
                <Sparkles className="w-5 h-5 flex-shrink-0 text-amber-400" />
                <span>
                  <strong>Golden Takeaway:</strong> {currentLesson.content?.takeaway}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    if (selectedLessonIndex > 0) setSelectedLessonIndex(selectedLessonIndex - 1);
                  }}
                  disabled={selectedLessonIndex === 0}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 flex items-center gap-1.5 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous Lesson
                </button>

                <button
                  onClick={handleCompleteLesson}
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
                >
                  <span>
                    {selectedLessonIndex === lessons.length - 1
                      ? 'Complete All Lessons'
                      : 'Complete Lesson & Next'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
