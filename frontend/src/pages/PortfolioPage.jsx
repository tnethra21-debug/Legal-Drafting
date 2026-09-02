// frontend/src/pages/PortfolioPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import {
  FolderKanban,
  FileText,
  Award,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Eye,
  Scale,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';

export const PortfolioPage = ({ onNavigate }) => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await api.getPortfolio();
        if (res.success && res.portfolio) {
          setPortfolio(res.portfolio);
        }
      } catch (err) {
        console.warn('Portfolio fallback:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const items = portfolio?.items || [
    {
      id: 'port-1',
      title: 'Legal Notice for Unpaid Residential Rent',
      domainId: 'civil',
      levelId: 'BASIC',
      score: 84,
      attemptsCount: 2,
      aiSummary: 'Clear statutory notice structure under Section 106 TPA with precise 15-day cure timeline.',
      bestDraftText: `LEGAL NOTICE
BY REGISTERED POST WITH A.D.

Date: 10.02.2025

TO:
Mr. Vikram Malhotra,
Flat 402, Green Meadows Apartments, Anna Nagar, Chennai.

SUBJECT: LEGAL NOTICE FOR ARREARS OF RENT AMOUNTING TO RS. 1,50,000/- AND VACATION OF PREMISES

Sir,
Under instructions from my client, Mr. Rajesh Sharma, I hereby call upon you to pay arrears of Rs. 1,50,000/- within 15 days of receipt of this notice, failing which eviction and recovery proceedings will be instituted.

Yours faithfully,
Advocate for Landlord`,
      updatedAt: '2026-08-19'
    }
  ];

  return (
    <div className="min-h-screen mesh-gradient-bg text-slate-900 py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
              <FolderKanban className="w-4 h-4" />
              <span>Student Drafting Portfolio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              My Verified Legal Portfolio
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Curated collection of your completed legal drafts, multi-version redrafts, and AI evaluations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('certificate')}
              className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Award className="w-4 h-4" />
              <span>View Official Certificate</span>
            </button>
          </div>
        </div>

        {/* Two-Column Grid: Drafts List & Live Draft Preview */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column: Portfolio Draft Cards */}
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
              Completed Practical Submissions ({items.length})
            </div>

            {items.map((item) => {
              const isSelected = selectedDraft?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedDraft(item)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-400 bg-amber-50/50 shadow-md ring-1 ring-amber-400/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white shadow-xs'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {item.domainId} • {item.levelId} Level
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {item.score}%
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          v{item.attemptsCount || 1}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.aiSummary}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">Verified Submission</span>
                    <button className="text-amber-700 font-bold flex items-center gap-1 hover:underline">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview Draft</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Full Draft Inspector */}
          <div className="lg:col-span-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[650px] flex flex-col justify-between">
              {selectedDraft || items[0] ? (
                <>
                  <div className="border-b border-slate-200 pb-3 mb-4">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>Draft Inspector</span>
                      <span className="font-bold text-amber-700">Score: {(selectedDraft || items[0]).score}%</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{(selectedDraft || items[0]).title}</h3>
                  </div>

                  <pre className="flex-1 p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 whitespace-pre-wrap overflow-y-auto leading-relaxed">
                    {(selectedDraft || items[0]).bestDraftText}
                  </pre>

                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> Evaluated by Grounded AI
                    </span>
                    <button
                      onClick={() => onNavigate('workspace', { scenarioId: (selectedDraft || items[0]).scenarioId || 'scen-basic-civil-1' })}
                      className="btn-gold px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <span>Open in Studio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center p-8">
                  <FileText className="w-12 h-12 mb-2 text-slate-300" />
                  <p className="text-xs">Select any completed draft from the left to inspect full text.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
