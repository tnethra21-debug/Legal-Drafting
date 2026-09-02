// frontend/src/components/BadgeModal.jsx
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, X, Sparkles } from 'lucide-react';

export const BadgeModal = ({ badge, onClose }) => {
  useEffect(() => {
    if (badge) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D97706', '#F59E0B', '#0284C7', '#059669']
      });
    }
  }, [badge]);

  if (!badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-2xl border border-amber-300 p-6 text-center shadow-2xl shadow-amber-500/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md shadow-amber-500/30 flex items-center justify-center">
          <div className="w-full h-full bg-amber-50 rounded-[14px] flex items-center justify-center text-4xl">
            {badge.icon || '🏆'}
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Achievement Unlocked!
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">{badge.name}</h3>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">{badge.description}</p>

        <button
          onClick={onClose}
          className="w-full btn-gold py-2.5 rounded-xl text-sm font-bold shadow-sm"
        >
          Awesome! Continue
        </button>
      </div>
    </div>
  );
};
