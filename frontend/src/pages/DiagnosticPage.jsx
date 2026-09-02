// frontend/src/pages/DiagnosticPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import { ProgressBar } from '../components/ProgressBar.jsx';
import { shuffleQuestionsOptions } from '../utils/shuffle.js';
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
  const { updateUserProfile, addXPLocally } = useAuth();

  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const defaultQuestions = [
    {
      id: 'diag-1',
      question: 'What is the primary objective of legal drafting in professional practice?',
      options: [
        { id: 'A', text: 'To clearly communicate legal facts, rights, duties, and prayers with precision and unambiguity' },
        { id: 'B', text: 'To use archaic Latin maxims to make the document sound authoritative' },
        { id: 'C', text: 'To create lengthy documents to charge higher professional fees' },
        { id: 'D', text: 'To completely replace procedural steps in a court of law' }
      ]
    },
    {
      id: 'diag-2',
      question: 'In a Civil Plaint under Order VII Rule 1 CPC, which element is strictly mandatory to establish court authority?',
      options: [
        { id: 'A', text: 'Cause of Action statement and Valuation with Jurisdiction clause' },
        { id: 'B', text: 'The biography and financial standing of the advocate' },
        { id: 'C', text: 'A copy of all textbooks referenced during research' },
        { id: 'D', text: 'A handwritten letter to the presiding judge' }
      ]
    },
    {
      id: 'diag-3',
      question: 'Under Bharatiya Nagarik Suraksha Sanhita 2023 (BNSS), where is regular bail codified?',
      options: [
        { id: 'A', text: 'Section 480 / Section 483 BNSS 2023' },
        { id: 'B', text: 'Order 39 Rule 1 CPC' },
        { id: 'C', text: 'Section 138 Negotiable Instruments Act' },
        { id: 'D', text: 'Section 54 Transfer of Property Act' }
      ]
    },
    {
      id: 'diag-4',
      question: 'In a conveyance deed, what is the legal effect of omitting the operative consideration or transfer clause?',
      options: [
        { id: 'A', text: 'It fails to legally transfer title and renders the conveyance legally defective or voidable' },
        { id: 'B', text: 'It converts the sale into a criminal revision' },
        { id: 'C', text: 'It automatically triples the stamp duty' },
        { id: 'D', text: 'It has no effect under Indian Law' }
      ]
    },
    {
      id: 'diag-5',
      question: 'Under Order VI Rule 2 CPC, what is the cardinal principle distinguishing facts from evidence in pleadings?',
      options: [
        { id: 'A', text: 'Plead material facts, not evidence (facta probanda vs facta probantia)' },
        { id: 'B', text: 'Plead entire witness testimony in verbatim detail' },
        { id: 'C', text: 'Attach bank statements to every paragraph' },
        { id: 'D', text: 'Argue case law citations inside factual paragraphs' }
      ]
    }
  ];

  const initializeQuiz = (rawQuestions) => {
    // Randomize answer options order for every quiz start/attempt
    const qs = rawQuestions && rawQuestions.length > 0 ? rawQuestions : defaultQuestions;
    const shuffled = shuffleQuestionsOptions(qs);
    setQuestions(shuffled);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await api.getDiagnosticQuestions();
        if (res.success && res.questions && res.questions.length > 0) {
          initializeQuiz(res.questions);
        } else {
          initializeQuiz(defaultQuestions);
        }
      } catch (err) {
        console.warn('Using local fallback diagnostic questions:', err.message);
        initializeQuiz(defaultQuestions);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleStartQuiz = () => {
    // Re-shuffle options on starting quiz
    setQuestions(prev => shuffleQuestionsOptions(prev.length > 0 ? prev : defaultQuestions));
    setAnswers({});
    setCurrentIndex(0);
    setStarted(true);
  };

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
      Object.keys(answers).forEach((k) => {
        if (answers[k] === 'A') earned += 20; // correct option ID is A
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
        <div className="w-full max-w-xl bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 text-center shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mx-auto mb-4 text-3xl">
            🎯
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            Let's Check Your Skills 🎯
          </h2>
          <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
            Answer 5 questions to automatically determine your personalized starting level.
          </p>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left text-xs text-slate-700 space-y-2.5 mb-8">
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>5 Multiple Choice Legal Questions (Shuffled Options)</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Covers Civil, Criminal (BNS/BNSS) & Conveyancing</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Instantly unlocks your starting learning tier</span>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full btn-gold py-3.5 rounded-xl text-sm font-bold shadow-md shadow-amber-600/10 flex items-center justify-center gap-2"
          >
            <span>Start Assessment</span>
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
        <div className="w-full max-w-lg bg-white p-6 sm:p-10 rounded-2xl border border-amber-300 text-center shadow-xl shadow-amber-500/5">
          <div className="w-20 h-20 rounded-full bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-4xl mx-auto mb-4">
            {result.assignedLevel === 'ADVANCED' ? '🏆' : result.assignedLevel === 'MEDIUM' ? '⚡' : '🌱'}
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1 block">
            Diagnostic Completed
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            Score: {result.percentage}%
          </h2>

          <div className="my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 uppercase font-semibold">Your Assigned Starting Level:</span>
            <div className="text-2xl font-black text-amber-700 my-1">{result.levelLabel}</div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{result.levelDescription}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 text-left mb-6">
            <strong className="text-slate-800">System Rule:</strong> You cannot manually change levels. Higher levels will automatically unlock when you complete Drafting Basics and pass the Level Assessment.
          </div>

          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full btn-gold py-3.5 rounded-xl text-sm font-bold shadow-md shadow-amber-600/10 flex items-center justify-center gap-2"
          >
            <span>Open Learning Path & Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // 3. Question Screen
  const currentQ = questions[currentIndex] || defaultQuestions[0];
  const isAnswered = !!answers[currentQ.id];
  const allAnswered = questions.length > 0 && questions.every(q => answers[q.id]);
  const progressPct = ((currentIndex + 1) / (questions.length || 5)) * 100;
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="min-h-screen mesh-gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xl">
        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-2">
            <span>Diagnostic Assessment</span>
            <span className="text-amber-700 font-bold">
              Question {currentIndex + 1} of {questions.length || 5}
            </span>
          </div>
          <ProgressBar progress={progressPct} showPercentage={false} />
        </div>

        {/* Question Text */}
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
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                    isSelected
                      ? 'bg-amber-600 text-white'
                      : 'bg-white border border-slate-300 text-slate-600'
                  }`}
                >
                  {optionLabels[optIndex] || opt.id}
                </div>
                <span className="text-xs sm:text-sm font-medium leading-relaxed">
                  {opt.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Nav actions */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 flex items-center gap-1.5 transition"
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
              className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 shadow-sm"
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
