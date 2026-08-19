// frontend/src/pages/DraftingWorkspacePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
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
  const { user, addXPLocally, setUnlockedBadge } = useAuth();
  const { t } = useLanguage();

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
    <div className="min-h-screen mesh-gradient-bg text-slate-100 py-6 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-4 sm:p-5 border border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('scenarios', { domainId: scenario?.domainId, levelId: scenario?.levelId })}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
              title="Back to scenarios"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {scenario?.documentType || 'Legal Instrument'}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{scenario?.levelId} Level</span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-white">{scenario?.title}</h1>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-2">
            {saveStatus && (
              <span className="text-xs text-emerald-400 font-semibold animate-pulse mr-2">
                ✓ {saveStatus}
              </span>
            )}
            <button
              onClick={handleSaveDraft}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 hover:bg-slate-800 transition flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-slate-400" />
              <span>{saving ? 'Saving...' : 'Save Draft'}</span>
            </button>

            <button
              onClick={handleSubmitForAI}
              disabled={evaluating || !draftText.trim()}
              className="btn-gold px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/20 disabled:opacity-40"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{evaluating ? 'Analyzing with Rubrics...' : 'Submit for AI Review'}</span>
            </button>
          </div>
        </div>

        {/* Split Screen Studio Workspace */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel: Scenario Facts, Elements, Legal References, Template */}
          <div className="lg:col-span-5 glass-card border border-slate-800 overflow-hidden flex flex-col h-[750px]">
            {/* Tab Header */}
            <div className="flex border-b border-slate-800 bg-slate-950/60 p-1.5 text-xs font-semibold">
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
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs text-slate-300 leading-relaxed">
              {activeRefTab === 'facts' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                      Case Facts
                    </span>
                    <p className="whitespace-pre-line text-slate-300 font-sans leading-relaxed">
                      {scenario?.facts}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mb-1">
                      Drafting Mandate & Task
                    </span>
                    <p className="text-amber-200/90 font-medium">
                      {scenario?.task}
                    </p>
                  </div>
                </div>
              )}

              {activeRefTab === 'elements' && (
                <div className="space-y-3">
                  <div className="text-[11px] text-slate-400 font-semibold">
                    The AI Rubric verifies whether your draft includes these essential elements:
                  </div>
                  {(scenario?.requiredElements || []).map((req, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex items-start gap-2.5"
                    >
                      <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span className="text-slate-200">{req}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeRefTab === 'references' && (
                <div className="space-y-3">
                  <div className="text-[11px] text-slate-400 font-semibold">
                    Approved Statutory Provisions & Authorities:
                  </div>
                  {(scenario?.legalReferences || []).map((ref, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5"
                    >
                      <div className="font-bold text-white flex items-center gap-1.5 text-xs">
                        <Scale className="w-3.5 h-3.5 text-sky-400" />
                        {ref.act}
                      </div>
                      <div className="text-amber-400 font-semibold text-[11px]">{ref.section}</div>
                      <div className="text-slate-400 text-[11px]">{ref.note}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeRefTab === 'template' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                    <span>Reference Legal Skeleton</span>
                    <button
                      onClick={() => setDraftText(scenario?.template || '')}
                      className="text-amber-400 hover:underline"
                    >
                      Insert into Editor
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {scenario?.template}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Live Drafting Editor & AI Feedback View */}
          <div className="lg:col-span-7 glass-card border border-slate-800 overflow-hidden flex flex-col h-[750px]">
            {/* View Switcher Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/60 p-2">
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveRightTab('editor')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    activeRightTab === 'editor'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
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
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : latestEvaluation
                      ? 'text-amber-400 hover:bg-slate-900'
                      : 'text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    AI Feedback {latestEvaluation ? `(${latestEvaluation.overallScore}%)` : ''}
                  </span>
                </button>
              </div>

              {/* Word count metrics */}
              <div className="text-[11px] text-slate-400 flex items-center gap-3 pr-2">
                <span>{wordCount} Words</span>
                <span>{charCount} Chars</span>
                <span className="font-semibold text-slate-500">v{submission?.attemptsCount || 1}</span>
              </div>
            </div>

            {/* View 1: Live Editor */}
            {activeRightTab === 'editor' ? (
              <div className="flex-1 p-4 flex flex-col">
                <textarea
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  placeholder="Draft your legal instrument here..."
                  className="w-full flex-1 bg-slate-950/80 border border-slate-800 rounded-xl p-5 font-mono text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/60 leading-relaxed resize-none shadow-inner"
                  spellCheck={false}
                />
              </div>
            ) : (
              /* View 2: Grounded AI Evaluation Report */
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {latestEvaluation && (
                  <>
                    {/* Overall Score Banner */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 flex items-center justify-between">
                      <div>
                        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                          <ShieldCheck className="w-3.5 h-3.5" /> Grounded Evaluation
                        </div>
                        <h3 className="text-xl font-black text-white">AI Drafting Review</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Attempt v{latestEvaluation.versionNumber || selectedVersion}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-black text-amber-400">
                          {latestEvaluation.overallScore}%
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase">Overall Score</span>
                      </div>
                    </div>

                    {/* Criteria Score Breakdown Meters */}
                    <div className="space-y-3 p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
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
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Drafting Strengths
                      </h4>
                      <div className="space-y-1.5">
                        {latestEvaluation.strengths.map((str, i) => (
                          <div key={i} className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-200">
                            ✓ {str}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actionable Improvements */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" /> Actionable Improvements
                      </h4>
                      <div className="space-y-1.5">
                        {latestEvaluation.improvements.map((imp, i) => (
                          <div key={i} className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200">
                            • {imp}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Missing Elements (if any) */}
                    {latestEvaluation.missingElements?.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" /> Missing Requisite Clauses
                        </h4>
                        <div className="space-y-1.5">
                          {latestEvaluation.missingElements.map((miss, i) => (
                            <div key={i} className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 text-xs text-rose-200">
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
                        className="w-full btn-gold py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
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
