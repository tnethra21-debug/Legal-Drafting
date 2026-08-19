// frontend/src/components/ProgressBar.jsx
import React from 'react';

export const ProgressBar = ({ progress = 0, label = '', color = 'amber', showPercentage = true }) => {
  const clamped = Math.min(100, Math.max(0, Math.round(progress)));

  const colorClasses = {
    amber: 'from-amber-600 via-amber-500 to-amber-400',
    emerald: 'from-emerald-600 via-emerald-500 to-emerald-400',
    sky: 'from-sky-600 via-sky-500 to-sky-400',
    purple: 'from-purple-600 via-purple-500 to-purple-400'
  };

  const gradient = colorClasses[color] || colorClasses.amber;

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-semibold mb-1.5 text-slate-300">
          <span>{label}</span>
          {showPercentage && <span className="text-amber-400">{clamped}%</span>}
        </div>
      )}
      <div className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50 p-0.5 shadow-inner">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-500 ease-out shadow-sm`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
