// frontend/src/pages/LevelTestPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import { ProgressBar } from '../components/ProgressBar.jsx';
import { shuffleQuestionsOptions } from '../utils/shuffle.js';
import {
  Award,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Zap,
  Lock
} from 'lucide-react';

export const LevelTestPage = ({ level = 'BASIC', onNavigate }) => {
  const { user, updateUserProfile, addXPLocally, setUnlockedBadge } = useAuth();
  const [testQuestions, setTestQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const fallbackQuestions = [
    {
      id: 'bt-1',
      question: 'In a statutory legal notice under Section 106 of the Transfer of Property Act, what is the default statutory notice period for terminating a residential month-to-month tenancy?',
      options: [
        { id: 'A', text: '15 days expiring with the end of a month of the tenancy' },
        { id: 'B', text: '6 months mandatory' },
        { id: 'C', text: '24 hours verbal notice' },
        { id: 'D', text: 'No notice is needed' }
      ]
    },
    {
      id: 'bt-2',
      question: 'Under Bharatiya Nagarik Suraksha Sanhita (BNSS 2023), which section corresponds to the Magistrate’s power to direct police investigation upon complaint?',
      options: [
        { id: 'A', text: 'Section 175(3) BNSS 2023' },
        { id: 'B', text: 'Section 482 IPC' },
        { id: 'C', text: 'Order 39 CPC' },
        { id: 'D', text: 'Section 138 NI Act' }
      ]
    },
    {
      id: 'bt-3',
      question: 'In drafting a commercial lease, what is the legal purpose of a "Quiet Enjoyment" covenant?',
      options: [
        { id: 'A', text: 'To ensure the lessee can peacefully hold and enjoy the premises without interruption by the lessor or superior title holders' },
        { id: 'B', text: 'To prohibit the tenant from playing music after 8 PM' },
        { id: 'C', text: 'To exempt the landlord from municipal tax payments' },
        { id: 'D', text: 'To allow the lessor to re-enter at any time without notice' }
      ]
    },
    {
      id: 'bt-4',
      question: 'Under Order VI Rule 16 CPC, on what ground may a court strike out pleadings?',
      options: [
        { id: 'A', text: 'If they are unnecessary, scandalous, frivolous, or an abuse of the court process' },
        { id: 'B', text: 'If they are typed in a modern font' },
        { id: 'C', text: 'If the plaint is filed by a female plaintiff' },
        { id: 'D', text: 'If the advocate is a junior counsel' }
      ]
    }
  ];

  const initializeTest = (rawQuestions) => {
    const qs = rawQuestions && rawQuestions.length > 0 ? rawQuestions : fallbackQuestions;
    setTestQuestions(shuffleQuestionsOptions(qs));
  };

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await api.getLevelAssessment(level);
        if (res.success && res.test && res.test.questions) {
          initializeTest(res.test.questions);
        } else {
          initializeTest(fallbackQuestions);
        }
      } catch (err) {
        console.warn('Fallback loading level test:', err.message);
        initializeTest(fallbackQuestions);
      }
    };
    fetchTest();
  }, [level]);

  const handleSelectOption = (qId, optId) => {
    setAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const handleNext = () => {
    if (currentIndex < testQuestions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleRetry = () => {
    setTestQuestions(prev => shuffleQuestionsOptions(prev.length > 0 ? prev : fallbackQuestions));
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await api.submitLevelAssessment(level, answers);
      if (res.success && res.result) {
        setResult(res.result);
        if (res.result.passed) {
          const nextLevel = level === 'BASIC' ? 'MEDIUM' : 'ADVANCED';
          const newUnlocked = Array.from(new Set([...(user?.unlockedLevels || ['BASIC']), nextLevel]));
          updateUserProfile({
            currentLevelId: nextLevel,
            unlockedLevels: newUnlocked
          });
          addXPLocally(100);
          setUnlockedBadge({
            name: 'Level Conqueror ⚡',
            description: `Passed the ${level} Level Test and unlocked the ${nextLevel} learning tier!`
          });
        }
      }
    } catch (err) {
      let correct = 0;
      testQuestions.forEach(q => { if (answers[q.id] === 'A') correct++; });
      const pct = Math.round((correct / (testQuestions.length || 4)) * 100);
      const passed = pct >= 75;
      setResult({
        score: correct * 25,
        percentage: pct,
        passed
      });
      if (passed) {
        const nextLevel = level === 'BASIC' ? 'MEDIUM' : 'ADVANCED';
        updateUserProfile({
          currentLevelId: nextLevel,
          unlockedLevels: Array.from(new Set([...(user?.unlockedLevels || ['BASIC']), nextLevel]))
        });
        addXPLocally(100);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const currentQ = testQuestions[currentIndex] || fallbackQuestions[0];
  const isAnswered = !!answers[currentQ.id];
  const allAnswered = testQuestions.length > 0 && testQuestions.every(q => answers[q.id]);
  const progressPct = ((currentIndex + 1) / (testQuestions.length || 4)) * 100;
  const optionLabels = ['A', 'B', 'C', 'D'];

  if (result) {
    return (
      <div className="min-h-screen mesh-gradient-bg flex items-center justify-center p-4">
        <div className={`w-full max-w-lg bg-white p-6 sm:p-10 rounded-2xl border text-center shadow-xl ${
          result.passed ? 'border-amber-300 shadow-amber-500/5' : 'border-rose-300'
        }`}>
          <div className="w-20 h-20 rounded-full bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-4xl mx-auto mb-4">
            {result.passed ? '⚡' : '📖'}
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block mb-1">
            {level} Level Progression Assessment
          </span>

          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
            Score: {result.percentage}%
          </h2>

          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            {result.passed
              ? `🎉 Outstanding! You have cleared the ${level} Level Test with ${result.percentage}%. The next learning tier is now unlocked for you!`
              : `You scored ${result.percentage}%, which is below the 75% requirement. Please review your scenario feedback and retry.`}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {result.passed ? (
              <button
                onClick={() => onNavigate('domains')}
                className="w-full btn-gold py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-amber-600/10"
              >
                <span>Enter Next Level Practice</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-100 border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
                >
                  Return to Dashboard
                </button>
                <button
                  onClick={handleRetry}
                  className="flex-1 btn-gold py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retry Test
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
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span className="flex items-center gap-1.5 text-amber-700 font-bold">
              ⚡ {level} Level Progression Test
            </span>
            <span>Question {currentIndex + 1} of {testQuestions.length || 4}</span>
          </div>
          <ProgressBar progress={progressPct} showPercentage={false} />
        </div>

        <div className="mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
            {currentQ.question}
          </h3>
        </div>

        {/* Shuffled Options */}
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
                <span className="text-xs sm:text-sm font-medium leading-relaxed">{opt.text}</span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          {currentIndex < (testQuestions.length - 1) ? (
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
              <span>{submitting ? 'Evaluating...' : 'Submit Level Test'}</span>
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
