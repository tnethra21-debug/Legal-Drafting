// frontend/src/pages/DiagnosticPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { api } from '../services/api.js';
import { ProgressBar } from '../components/ProgressBar.jsx';
import {
  Target,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Award
} from 'lucide-react';

export const DiagnosticPage = ({ onNavigate }) => {
  const { user, updateUserProfile, addXPLocally } = useAuth();
  const { currentLanguage, t } = useLanguage();

  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await api.getDiagnosticQuestions();
        if (res.success && res.questions) {
          setQuestions(res.questions);
        }
      } catch (err) {
        console.warn('Using local fallback diagnostic questions:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSelectOption = (questionId, optionId) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await api.submitDiagnostic(answers);
      if (res.success && res.result) {
        setResult(res.result);
        updateUserProfile({
          currentLevelId: res.result.assignedLevel,
          unlockedLevels: res.result.unlockedLevels,
          isDiagnosticCompleted: true
        });
        addXPLocally(50);
      }
    } catch (err) {
      // Local fallback calculation if backend request failed
      let earned = 0;
      Object.keys(answers).forEach((k, idx) => {
        if (answers[k] === 'A') earned += 20; // demo fallback
      });
      const pct = Math.max(40, earned);
      const fallbackLevel = pct >= 80 ? 'ADVANCED' : pct >= 50 ? 'MEDIUM' : 'BASIC';
      const fallbackRes = {
        score: earned,
        totalPossible: 100,
        percentage: pct,
        assignedLevel: fallbackLevel,
        levelLabel: fallbackLevel === 'ADVANCED' ? 'Advanced Level 🏆' : fallbackLevel === 'MEDIUM' ? 'Medium Level ⚡' : 'Basic Level 🌱',
        levelDescription: 'Demonstrated solid grasp of legal drafting principles.'
      };
      setResult(fallbackRes);
      updateUserProfile({
        currentLevelId: fallbackLevel,
        unlockedLevels: [fallbackLevel],
        isDiagnosticCompleted: true
      });
      addXPLocally(50);
    } finally {
      setSubmitting(false);
    }
  };

  // 1. Pre-Assessment Intro Screen
  if (!started) {
    return (
      <div className="min-h-screen mesh-gradient-bg flex items-center justify-center p-4">
        <div className="w-full max-w-xl glass-card p-6 sm:p-10 border border-slate-800 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4 text-3xl">
            🎯
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            {t('diagnosticTitle')}
          </h2>
          <p className="text-sm text-slate-300 mb-6 max-w-md mx-auto leading-relaxed">
            {t('diagnosticSubtitle')}
          </p>

          <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 text-left text-xs text-slate-300 space-y-2 mb-8">
            <div className="flex items-center gap-2 font-semibold text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>5 Multiple Choice Legal Questions</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Covers Civil, Criminal (BNS/BNSS) & Conveyancing</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instantly unlocks your starting learning tier</span>
            </div>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="w-full btn-gold py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <span>{t('startAssessment')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // 2. Post-Assessment Result Modal
  if (result) {
    return (
      <div className="min-h-screen mesh-gradient-bg flex items-center justify-center p-4">
        <div className="w-full max-w-lg glass-card p-6 sm:p-10 border border-amber-500/40 text-center shadow-2xl shadow-amber-500/10">
          <div className="w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-400/40 flex items-center justify-center text-4xl mx-auto mb-4">
            {result.assignedLevel === 'ADVANCED' ? '🏆' : result.assignedLevel === 'MEDIUM' ? '⚡' : '🌱'}
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1 block">
            Diagnostic Completed
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Score: {result.percentage}%
          </h2>

          <div className="my-6 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <span className="text-xs text-slate-400 uppercase font-semibold">Your Assigned Starting Level:</span>
            <div className="text-2xl font-black text-amber-400 my-1">{result.levelLabel}</div>
            <p className="text-xs text-slate-300 mt-2">{result.levelDescription}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 text-left mb-6">
            <strong className="text-slate-200">System Rule:</strong> You cannot manually change levels. Higher levels will automatically unlock when you complete Drafting Basics and pass the Level Assessment.
          </div>

          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full btn-gold py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <span>Open Learning Path & Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // 3. Question Screen
  const currentQ = questions[currentIndex] || {
    id: 'diag-1',
    question: 'What is the primary objective of legal drafting?',
    options: [
      { id: 'A', text: 'To clearly communicate legal facts, rights, and prayers with precision and unambiguity' },
      { id: 'B', text: 'To make documents longer to charge higher fees' },
      { id: 'C', text: 'To avoid legal terminology' },
      { id: 'D', text: 'To replace legal procedures' }
    ]
  };

  // Localized question text if available
  const localizedQuestion = currentLanguage === 'ta' && currentQ.question_ta
    ? currentQ.question_ta
    : currentLanguage === 'hi' && currentQ.question_hi
    ? currentQ.question_hi
    : currentQ.question;

  const isAnswered = !!answers[currentQ.id];
  const allAnswered = questions.length > 0 && questions.every(q => answers[q.id]);
  const progressPct = ((currentIndex + 1) / (questions.length || 5)) * 100;

  return (
    <div className="min-h-screen mesh-gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl glass-card p-6 sm:p-10 border border-slate-800 shadow-2xl">
        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-2">
            <span>Diagnostic Assessment</span>
            <span className="text-amber-400 font-bold">
              Question {currentIndex + 1} of {questions.length || 5}
            </span>
          </div>
          <ProgressBar progress={progressPct} showPercentage={false} />
        </div>

        {/* Question Text */}
        <div className="mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {localizedQuestion}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {currentQ.options.map((opt) => {
            const isSelected = answers[currentQ.id] === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(currentQ.id, opt.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-white shadow-md ring-1 ring-amber-500/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {opt.id}
                </div>
                <span className="text-xs sm:text-sm font-medium leading-relaxed">
                  {opt.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Nav actions */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          {currentIndex < (questions.length - 1) ? (
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-40"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered || submitting}
              className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 shadow-lg shadow-amber-500/20"
            >
              <span>{submitting ? 'Evaluating...' : 'Submit Assessment'}</span>
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
