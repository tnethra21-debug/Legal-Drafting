// frontend/src/pages/ScenarioSelectionPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import {
  FileText,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  BookOpen,
  Sparkles,
  Award,
  Scale
} from 'lucide-react';

export const ScenarioSelectionPage = ({ domainId = 'civil', levelId = 'BASIC', onNavigate }) => {
  const { user } = useAuth();
  const [scenarios, setScenarios] = useState([]);
  const [domainInfo, setDomainInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const res = await api.getScenariosByDomain(domainId, levelId);
        if (res.success) {
          setScenarios(res.scenarios || []);
          setDomainInfo(res.domain || null);
        }
      } catch (err) {
        console.warn('Fallback loading scenarios:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchScenarios();
  }, [domainId, levelId]);

  return (
    <div className="min-h-screen mesh-gradient-bg text-slate-100 py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 border border-slate-800">
          <div>
            <button
              onClick={() => onNavigate('domains')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-amber-400 mb-2 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Domains
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              <span>{domainInfo?.name || 'Practical Drafting'}</span>
              <span className="text-sm font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-0.5 rounded-full">
                {levelId} Level
              </span>
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Select a realistic scenario to prepare, draft, and receive Grounded AI feedback.
            </p>
          </div>
        </div>

        {/* Scenarios Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {scenarios.map((scenario) => {
            return (
              <div
                key={scenario.id}
                className="glass-card p-6 border border-slate-800 hover:border-amber-500/40 transition flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                      {scenario.documentType}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-500" /> {scenario.readTime || '5 min'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{scenario.title}</h3>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2 mb-4">
                    <div>
                      <strong className="text-white block mb-0.5">Facts Summary:</strong>
                      <p className="line-clamp-3 text-slate-400">{scenario.facts}</p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300">
                    <strong className="text-amber-400 block mb-1">Your Drafting Task:</strong>
                    <p className="line-clamp-2 text-slate-400">{scenario.task}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {scenario.isCompleted ? (
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Score: {scenario.submissionScore}%
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 font-medium">Ready to start</span>
                    )}
                  </div>

                  <button
                    onClick={() => onNavigate('workspace', { scenarioId: scenario.id })}
                    className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/10"
                  >
                    <span>{scenario.isCompleted ? 'View / Improve Draft' : 'Start Drafting'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
