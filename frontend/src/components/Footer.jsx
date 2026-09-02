// frontend/src/components/Footer.jsx
import React from 'react';
import { Scale, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 px-4 text-xs text-slate-500 text-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-amber-600" />
          <span className="font-bold text-slate-800">LegalDraft Learning Platform</span>
          <span>— Indian Legal Practice & Statutory Drafting Suite</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1 text-slate-700 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Grounded AI Rubrics
          </span>
          <span>CPC 1908 • BNS 2023 • BNSS 2023 • TPA 1882</span>
        </div>
      </div>
    </footer>
  );
};
