// frontend/src/pages/QuizGatePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { api } from '../services/api.js';
import { ProgressBar } from '../components/ProgressBar.jsx';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Clock,
  BookOpen,
  Award
} from 'lucide-react';

export const QuizGatePage = ({ onNavigate }) => {
  const { user, updateUserProfile, addXPLocally } = useAuth();
  const { t } = useLanguage();

  const [quizData, setQuizData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.getQuizGateQuestions();
        if (res.success && res.quiz) {
          setQuizData(res.quiz);
        }
      } catch (err) {
        console.warn('Fallback loading quiz questions:', err.message);
      }
    };
    fetchQuiz();
  }, []);

  const questions = quizData?.questions || [
    {
      id: 'quiz-1',
      question: 'What are the 4 fundamental Cs of effective legal drafting?',
      options: [
        { id: 'A', text: 'Clarity, Conciseness, Completeness, Consistency' },
        { id: 'B', text: 'Complexity, Length, Latin phrases, Citations' },
        { id: 'C', text: 'Cost, Confidentiality, Caution, Courts' },
        { id: 'D', text: 'Clauses, Covenants, Counter-claims, Certification' }
      ]
    },
    {
      id: 'quiz-2',
      question: 'In a legal document, what does the word "SHALL" legally denote?',
      options: [
        { id: 'A', text: 'A mandatory duty or obligation with binding legal effect' },
        { id: 'B', text: 'A discretionary option that may be ignored' },
        { id: 'C', text: 'A futuristic hope or aspiration' },
        { id: 'D', text: 'A suggestion for mediation' }
      ]
    }
  ];

  const handleSelectOption = (qId, optId) => {
    setAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await api.submitQuizGate(answers);
      if (res.success && res.result) {
        setResult(res.result);
        if (res.result.passed) {
          updateUserProfile({ isQuizGatePassed: true });
          addXPLocally(25);
        }
      }
    } catch (err) {
      // Fallback evaluation
      let correct = 0;
      questions.forEach(q => {
        if (answers[q.id] === 'A') correct++;
      });
      const pct = Math.round((correct / questions.length) * 100);
      const passed = pct >= 70;
      setResult({
        score: correct * 10,
        percentage: pct,
        passed,
        results: []
      });
      if (passed) {
        updateUserProfile({ isQuizGatePassed: true });
        addXPLocally(25);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const currentQ = questions[currentIndex] || questions[0];
  const isAnswered = !!answers[currentQ.id];
  const allAnswered = questions.every(q => answers[q.id]);
  const progressPct = ((currentIndex + 1) / questions.length) * 100;

  // Post-Quiz Result Screen
  if (result) {
    return (
      <div className="min-h-screen mesh-gradient-bg flex items-center justify-center p-4">
        <div className={`w-full max-w-lg glass-card p-6 sm:p-10 border text-center shadow-2xl ${
          result.passed ? 'border-emerald-500/40 shadow-emerald-500/10' : 'border-rose-500/40'
        }`}>
          <div className="w-20 h-20 rounded-full bg-slate-900 border-2 flex items-center justify-center text-4xl mx-auto mb-4">
            {result.passed ? '🎉' : '📖'}
          </div>

          <span className={`text-xs font-bold uppercase tracking-widest block mb-1 ${
            result.passed ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {result.passed ? 'Quiz Gate Passed!' : 'Keep Practicing'}
          </span>

          <h2 className="text-3xl font-extrabold text-white mb-2">
            Score: {result.percentage}%
          </h2>

          <p className="text-sm text-slate-300 mb-6">
            {result.passed
              ? 'Excellent work! You have demonstrated solid foundational drafting competence. You are now unlocked to choose practice scenarios in your assigned level.'
              : 'You scored below the 70% passing threshold. Please review the 8 Drafting Basics lessons and try the quiz gate again.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {result.passed ? (
              <button
                onClick={() => onNavigate('domains')}
                className="w-full btn-gold py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <span>Enter Practical Drafting Domains</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('basics')}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 hover:bg-slate-800 transition flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Review Lessons
                </button>
                <button
                  onClick={() => { setResult(null); setAnswers({}); setCurrentIndex(0); }}
                  className="flex-1 btn-gold py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retry Quiz Gate
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mesh-gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl glass-card p-6 sm:p-10 border border-slate-800 shadow-2xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              🧠 Drafting Basics Quiz Gate
            </span>
            <span>Question {currentIndex + 1} of {questions.length}</span>
          </div>
          <ProgressBar progress={progressPct} showPercentage={false} />
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {currentQ.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {currentQ.options.map(opt => {
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
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                  isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {opt.id}
                </div>
                <span className="text-xs sm:text-sm font-medium leading-relaxed">
                  {opt.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 flex items-center gap-1.5 transition"
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
              <span>{submitting ? 'Submitting...' : 'Submit Quiz Gate'}</span>
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
