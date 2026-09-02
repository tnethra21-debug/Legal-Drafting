// frontend/src/pages/QuizGatePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import { ProgressBar } from '../components/ProgressBar.jsx';
import { shuffleQuestionsOptions } from '../utils/shuffle.js';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  BookOpen,
  Award
} from 'lucide-react';

export const QuizGatePage = ({ onNavigate }) => {
  const { updateUserProfile, addXPLocally } = useAuth();

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const fallbackQuestions = [
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
    },
    {
      id: 'quiz-3',
      question: 'What is the consequence of passive voice overuse in legal covenants?',
      options: [
        { id: 'A', text: 'It creates syntactic ambiguity by obscuring which party has the legal duty' },
        { id: 'B', text: 'It makes the document legally invalid automatically' },
        { id: 'C', text: 'It increases court fees' },
        { id: 'D', text: 'It converts the agreement into a deed' }
      ]
    },
    {
      id: 'quiz-4',
      question: 'Which operative clause in a commercial contract establishes dispute settlement before arbitration?',
      options: [
        { id: 'A', text: 'Multi-tiered dispute resolution / Conciliation clause' },
        { id: 'B', text: 'Severability clause' },
        { id: 'C', text: 'Force Majeure clause' },
        { id: 'D', text: 'Entire Agreement clause' }
      ]
    },
    {
      id: 'quiz-5',
      question: 'In an affidavit, what is the mandatory legal requirement for verification?',
      options: [
        { id: 'A', text: 'Specifying clearly which paragraphs are true to knowledge and which are true to information/belief' },
        { id: 'B', text: 'Signing every line with red ink' },
        { id: 'C', text: 'Including character references from two advocates' },
        { id: 'D', text: 'Attaching passport photos of the judge' }
      ]
    }
  ];

  const initializeQuiz = (rawQuestions) => {
    const qs = rawQuestions && rawQuestions.length > 0 ? rawQuestions : fallbackQuestions;
    setQuizQuestions(shuffleQuestionsOptions(qs));
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.getQuizGateQuestions();
        if (res.success && res.quiz && res.quiz.questions) {
          initializeQuiz(res.quiz.questions);
        } else {
          initializeQuiz(fallbackQuestions);
        }
      } catch (err) {
        console.warn('Fallback loading quiz questions:', err.message);
        initializeQuiz(fallbackQuestions);
      }
    };
    fetchQuiz();
  }, []);

  const handleSelectOption = (qId, optId) => {
    setAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleRetryQuiz = () => {
    // Re-shuffle options on retry for a brand new randomized layout
    setQuizQuestions(prev => shuffleQuestionsOptions(prev.length > 0 ? prev : fallbackQuestions));
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
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
      // Fallback evaluation (correct options mapped by option id 'A')
      let correct = 0;
      quizQuestions.forEach(q => {
        if (answers[q.id] === 'A') correct++;
      });
      const pct = Math.round((correct / (quizQuestions.length || 5)) * 100);
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

  const currentQ = quizQuestions[currentIndex] || fallbackQuestions[0];
  const isAnswered = !!answers[currentQ.id];
  const allAnswered = quizQuestions.length > 0 && quizQuestions.every(q => answers[q.id]);
  const progressPct = ((currentIndex + 1) / (quizQuestions.length || 5)) * 100;
  const optionLabels = ['A', 'B', 'C', 'D'];

  // Post-Quiz Result Screen
  if (result) {
    return (
      <div className="min-h-screen mesh-gradient-bg flex items-center justify-center p-4">
        <div className={`w-full max-w-lg bg-white p-6 sm:p-10 rounded-2xl border text-center shadow-xl ${
          result.passed ? 'border-emerald-300 shadow-emerald-500/5' : 'border-rose-300'
        }`}>
          <div className="w-20 h-20 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center text-4xl mx-auto mb-4">
            {result.passed ? '🎉' : '📖'}
          </div>

          <span className={`text-xs font-bold uppercase tracking-widest block mb-1 ${
            result.passed ? 'text-emerald-700' : 'text-rose-700'
          }`}>
            {result.passed ? 'Quiz Gate Passed!' : 'Keep Practicing'}
          </span>

          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
            Score: {result.percentage}%
          </h2>

          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            {result.passed
              ? 'Excellent work! You have demonstrated solid foundational drafting competence. You are now unlocked to choose practice scenarios in your assigned level.'
              : 'You scored below the 70% passing threshold. Please review the 8 Drafting Basics lessons and try the quiz gate again.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {result.passed ? (
              <button
                onClick={() => onNavigate('domains')}
                className="w-full btn-gold py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-amber-600/10"
              >
                <span>Enter Practical Drafting Domains</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('basics')}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-100 border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-200 transition flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Review Lessons
                </button>
                <button
                  onClick={handleRetryQuiz}
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
      <div className="w-full max-w-2xl bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span className="flex items-center gap-1.5 text-amber-700 font-bold">
              🧠 Drafting Basics Quiz Gate
            </span>
            <span>Question {currentIndex + 1} of {quizQuestions.length || 5}</span>
          </div>
          <ProgressBar progress={progressPct} showPercentage={false} />
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
            {currentQ.question}
          </h3>
        </div>

        {/* Options (Randomly Shuffled) */}
        <div className="space-y-3 mb-8">
          {currentQ.options.map((opt, optIndex) => {
            const isSelected = answers[currentQ.id] === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(currentQ.id, opt.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-amber-50/80 border-amber-500 text-slate-900 shadow-xs ring-1 ring-amber-500/30'
                    : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                  isSelected ? 'bg-amber-600 text-white' : 'bg-white border border-slate-300 text-slate-600'
                }`}>
                  {optionLabels[optIndex] || opt.id}
                </div>
                <span className="text-xs sm:text-sm font-medium leading-relaxed">
                  {opt.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          {currentIndex < (quizQuestions.length - 1) ? (
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
              className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 shadow-sm"
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
