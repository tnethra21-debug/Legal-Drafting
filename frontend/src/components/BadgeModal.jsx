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
        colors: ['#F59E0B', '#FBBF24', '#38BDF8', '#10B981']
      });
    }
  }, [badge]);

  if (!badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm glass-card border border-amber-500/40 p-6 text-center shadow-2xl shadow-amber-500/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-xl shadow-amber-500/30 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-4xl">
            {badge.icon || '🏆'}
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Achievement Unlocked!
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{badge.name}</h3>
        <p className="text-sm text-slate-300 mb-6">{badge.description}</p>

        <button
          onClick={onClose}
          className="w-full btn-gold py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-amber-500/20"
        >
          Awesome! Continue
        </button>
      </div>
    </div>
  );
};
