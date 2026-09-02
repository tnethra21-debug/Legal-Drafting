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
    <div className="min-h-screen mesh-gradient-bg text-slate-900 py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <button
              onClick={() => onNavigate('domains')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-amber-700 mb-2 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Domains
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>{domainInfo?.name || 'Practical Drafting'}</span>
              <span className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full">
                {levelId} Level
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
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
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                      {scenario.documentType}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {scenario.readTime || '5 min'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">{scenario.title}</h3>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2 mb-4">
                    <div>
                      <strong className="text-slate-900 block mb-0.5">Facts Summary:</strong>
                      <p className="line-clamp-3 text-slate-600 leading-relaxed">{scenario.facts}</p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-700">
                    <strong className="text-amber-800 block mb-1 font-bold">Your Drafting Task:</strong>
                    <p className="line-clamp-2 text-slate-600 leading-relaxed">{scenario.task}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {scenario.isCompleted ? (
                      <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Score: {scenario.submissionScore}%
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">Ready to start</span>
                    )}
                  </div>

                  <button
                    onClick={() => onNavigate('workspace', { scenarioId: scenario.id })}
                    className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
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
