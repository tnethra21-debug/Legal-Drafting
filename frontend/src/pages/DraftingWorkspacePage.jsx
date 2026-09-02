// frontend/src/pages/DraftingWorkspacePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import { ProgressBar } from '../components/ProgressBar.jsx';
import {
  FileText,
  Save,
  Send,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  Scale,
  Award,
  Layers,
  FileCode,
  ShieldCheck
} from 'lucide-react';

export const DraftingWorkspacePage = ({ scenarioId = 'scen-basic-civil-1', onNavigate }) => {
  const { addXPLocally, setUnlockedBadge } = useAuth();

  const [scenario, setScenario] = useState(null);
  const [draftText, setDraftText] = useState('');
  const [submission, setSubmission] = useState(null);
  const [activeRefTab, setActiveRefTab] = useState('facts'); // 'facts', 'elements', 'references', 'template'
  const [activeRightTab, setActiveRightTab] = useState('editor'); // 'editor' or 'feedback'
  const [selectedVersion, setSelectedVersion] = useState(1);
  const [saving, setSaving] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [latestEvaluation, setLatestEvaluation] = useState(null);

  useEffect(() => {
    const fetchScenarioAndDraft = async () => {
      try {
        const res = await api.getScenarioById(scenarioId);
        if (res.success && res.scenario) {
          setScenario(res.scenario);
          if (res.submission) {
            setSubmission(res.submission);
            setDraftText(res.submission.currentDraftText || res.scenario.template || '');
            if (res.submission.latestEvaluation) {
              setLatestEvaluation(res.submission.latestEvaluation);
            }
            setSelectedVersion(res.submission.attemptsCount || 1);
          } else {
            setDraftText(res.scenario.template || '');
          }
        }
      } catch (err) {
        console.warn('Fallback loading scenario:', err.message);
      }
    };
    fetchScenarioAndDraft();
  }, [scenarioId]);

  const handleSaveDraft = async () => {
    setSaving(true);
    setSaveStatus('Saving...');
    try {
      await api.saveDraft(scenarioId, draftText);
      setSaveStatus('Draft saved locally & synced.');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      setSaveStatus('Saved locally.');
      setTimeout(() => setSaveStatus(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitForAI = async () => {
    if (!draftText.trim()) return;
    setEvaluating(true);
    try {
      const res = await api.submitForAIEvaluation(scenarioId, draftText);
      if (res.success) {
        setSubmission(res.submission);
        setLatestEvaluation(res.evaluation);
        setSelectedVersion(res.versionNumber);
        setActiveRightTab('feedback');

        addXPLocally(res.versionNumber === 1 ? 20 : 30);
        if (res.versionNumber > 1) {
          setUnlockedBadge({
            name: 'Iterative Drafter ✍️',
            description: 'Successfully improved and resubmitted a draft using Grounded AI feedback!'
          });
        }
      }
    } catch (err) {
      console.warn('Fallback local evaluation:', err.message);
    } finally {
      setEvaluating(false);
    }
  };

  const handleStartRedraft = () => {
    setActiveRightTab('editor');
    setSaveStatus('Ready for Version ' + ((submission?.attemptsCount || 1) + 1));
  };

  const wordCount = draftText.trim() ? draftText.trim().split(/\s+/).length : 0;
  const charCount = draftText.length;

  return (
    <div className="min-h-screen mesh-gradient-bg text-slate-900 py-6 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('scenarios', { domainId: scenario?.domainId, levelId: scenario?.levelId })}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 transition"
              title="Back to scenarios"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {scenario?.documentType || 'Legal Instrument'}
                </span>
                <span className="text-xs text-slate-500 font-semibold">{scenario?.levelId} Level</span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-slate-900">{scenario?.title}</h1>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-2">
            {saveStatus && (
              <span className="text-xs text-emerald-700 font-semibold animate-pulse mr-2">
                ✓ {saveStatus}
              </span>
            )}
            <button
              onClick={handleSaveDraft}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5 shadow-2xs"
            >
              <Save className="w-3.5 h-3.5 text-slate-500" />
              <span>{saving ? 'Saving...' : 'Save Draft'}</span>
            </button>

            <button
              onClick={handleSubmitForAI}
              disabled={evaluating || !draftText.trim()}
              className="btn-gold px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-40"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{evaluating ? 'Analyzing with Rubrics...' : 'Submit for AI Review'}</span>
            </button>
          </div>
        </div>

        {/* Split Screen Studio Workspace */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel: Scenario Facts, Elements, Legal References, Template */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[750px]">
            {/* Tab Header */}
            <div className="flex border-b border-slate-200 bg-slate-50/80 p-1.5 text-xs font-semibold">
              {[
                { id: 'facts', label: 'Facts & Instructions', icon: '📋' },
                { id: 'elements', label: 'Required Clauses', icon: '🔍' },
                { id: 'references', label: 'Legal Statutes', icon: '⚖️' },
                { id: 'template', label: 'Sample Model', icon: '📄' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveRefTab(tab.id)}
                  className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-1.5 text-[11px] ${
                    activeRefTab === tab.id
                      ? 'bg-white text-amber-800 border border-slate-200/80 font-bold shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs text-slate-700 leading-relaxed">
              {activeRefTab === 'facts' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block mb-1">
                      Case Facts
                    </span>
                    <p className="whitespace-pre-line text-slate-700 font-sans leading-relaxed">
                      {scenario?.facts}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest block mb-1">
                      Drafting Mandate & Task
                    </span>
                    <p className="text-amber-950 font-medium leading-relaxed">
                      {scenario?.task}
                    </p>
                  </div>
                </div>
              )}

              {activeRefTab === 'elements' && (
                <div className="space-y-3">
                  <div className="text-[11px] text-slate-500 font-semibold">
                    The AI Rubric verifies whether your draft includes these essential elements:
                  </div>
                  {(scenario?.requiredElements || []).map((req, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start gap-2.5"
                    >
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span className="text-slate-800 leading-relaxed">{req}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeRefTab === 'references' && (
                <div className="space-y-3">
                  <div className="text-[11px] text-slate-500 font-semibold">
                    Approved Statutory Provisions & Authorities:
                  </div>
                  {(scenario?.legalReferences || []).map((ref, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5"
                    >
                      <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                        <Scale className="w-3.5 h-3.5 text-sky-600" />
                        {ref.act}
                      </div>
                      <div className="text-amber-800 font-semibold text-[11px]">{ref.section}</div>
                      <div className="text-slate-600 text-[11px] leading-relaxed">{ref.note}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeRefTab === 'template' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <span>Reference Legal Skeleton</span>
                    <button
                      onClick={() => setDraftText(scenario?.template || '')}
                      className="text-amber-700 font-bold hover:underline"
                    >
                      Insert into Editor
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-800 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {scenario?.template}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Live Drafting Editor & AI Feedback View */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[750px]">
            {/* View Switcher Bar */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 p-2">
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveRightTab('editor')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    activeRightTab === 'editor'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Draft Editor</span>
                </button>

                <button
                  onClick={() => setActiveRightTab('feedback')}
                  disabled={!latestEvaluation}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    activeRightTab === 'feedback'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : latestEvaluation
                      ? 'text-amber-800 hover:bg-amber-50 font-semibold'
                      : 'text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    AI Feedback {latestEvaluation ? `(${latestEvaluation.overallScore}%)` : ''}
                  </span>
                </button>
              </div>

              {/* Word count metrics */}
              <div className="text-[11px] text-slate-500 flex items-center gap-3 pr-2 font-medium">
                <span>{wordCount} Words</span>
                <span>{charCount} Chars</span>
                <span className="font-semibold text-slate-600">v{submission?.attemptsCount || 1}</span>
              </div>
            </div>

            {/* View 1: Live Editor */}
            {activeRightTab === 'editor' ? (
              <div className="flex-1 p-4 flex flex-col">
                <textarea
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  placeholder="Draft your legal instrument here..."
                  className="w-full flex-1 bg-slate-50 border border-slate-200 rounded-xl p-5 font-mono text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/80 leading-relaxed resize-none transition"
                  spellCheck={false}
                />
              </div>
            ) : (
              /* View 2: Grounded AI Evaluation Report */
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {latestEvaluation && (
                  <>
                    {/* Overall Score Banner */}
                    <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
                      <div>
                        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 uppercase tracking-widest">
                          <ShieldCheck className="w-3.5 h-3.5" /> Grounded Evaluation
                        </div>
                        <h3 className="text-xl font-black text-slate-900">AI Drafting Review</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Attempt v{latestEvaluation.versionNumber || selectedVersion}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-black text-amber-700">
                          {latestEvaluation.overallScore}%
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase">Overall Score</span>
                      </div>
                    </div>

                    {/* Criteria Score Breakdown Meters */}
                    <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Rubric Criteria Breakdown
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-4 text-xs">
                        <ProgressBar progress={latestEvaluation.criteria?.clarity || 75} label="Clarity & Plain Language" color="sky" />
                        <ProgressBar progress={latestEvaluation.criteria?.structure || 70} label="Document Structure" color="purple" />
                        <ProgressBar progress={latestEvaluation.criteria?.completeness || 65} label="Requisite Completeness" color="amber" />
                        <ProgressBar progress={latestEvaluation.criteria?.legalAccuracy || 70} label="Legal & Statutory Accuracy" color="emerald" />
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Drafting Strengths
                      </h4>
                      <div className="space-y-1.5">
                        {latestEvaluation.strengths.map((str, i) => (
                          <div key={i} className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                            ✓ {str}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actionable Improvements */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-600" /> Actionable Improvements
                      </h4>
                      <div className="space-y-1.5">
                        {latestEvaluation.improvements.map((imp, i) => (
                          <div key={i} className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium">
                            • {imp}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Missing Elements (if any) */}
                    {latestEvaluation.missingElements?.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-rose-600" /> Missing Requisite Clauses
                        </h4>
                        <div className="space-y-1.5">
                          {latestEvaluation.missingElements.map((miss, i) => (
                            <div key={i} className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 font-medium">
                              ⚠️ {miss}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Redraft CTA */}
                    <div className="pt-2">
                      <button
                        onClick={handleStartRedraft}
                        className="w-full btn-gold py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Improve & Redraft (v{(submission?.attemptsCount || 1) + 1})</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
