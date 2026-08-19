// frontend/src/pages/DomainSelectionPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { api } from '../services/api.js';
import {
  Scale,
  ShieldAlert,
  FileText,
  BookOpen,
  ArrowRight,
  Sparkles,
  Zap,
  Lock,
  CheckCircle2,
  Info
} from 'lucide-react';

export const DomainSelectionPage = ({ onNavigate }) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentLevelId = user?.currentLevelId || 'BASIC';

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const res = await api.getAvailableDomains();
        if (res.success && res.domains) {
          setDomains(res.domains);
        }
      } catch (err) {
        console.warn('Fallback loading domains:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDomains();
  }, []);

  const domainList = domains.length > 0 ? domains : [
    {
      id: 'civil',
      name: 'Civil & Litigation',
      badge: '⚖️',
      description: 'Draft statutory legal notices, civil plaints, written statements, affidavits, and injunction applications under CPC 1908.',
      levels: ['BASIC', 'MEDIUM', 'ADVANCED']
    },
    {
      id: 'criminal',
      name: 'Criminal Law — BNS & BNSS',
      badge: '🏛️',
      description: 'Draft complaints, bail applications, and petitions under Bharatiya Nyaya Sanhita (BNS 2023) & BNSS 2023.',
      levels: ['BASIC', 'MEDIUM', 'ADVANCED']
    },
    {
      id: 'conveyancing',
      name: 'Conveyancing & Property',
      badge: '📄',
      description: 'Draft deeds, residential tenancy agreements, commercial leases, and sale agreements under TPA 1882.',
      levels: ['BASIC', 'MEDIUM', 'ADVANCED']
    },
    {
      id: 'legislative',
      name: 'Legislative Drafting',
      badge: '🏛️',
      description: 'Draft statutory bills, rules, regulations, amendments, and definitions for legislative policy.',
      levels: ['ADVANCED']
    }
  ];

  return (
    <div className="min-h-screen mesh-gradient-bg text-slate-100 py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="glass-card p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <Zap className="w-4 h-4" />
              <span>Practice Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t('chooseDomain')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Select any available practice area inside your unlocked tier ({currentLevelId} Level)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Active Tier: {currentLevelId}
            </span>
          </div>
        </div>

        {/* Domain Selection Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domainList.map((domain) => {
            const isAvailable = domain.levels.includes(currentLevelId);

            return (
              <div
                key={domain.id}
                onClick={() => {
                  if (isAvailable) {
                    onNavigate('scenarios', { domainId: domain.id, levelId: currentLevelId });
                  }
                }}
                className={`glass-card-interactive p-6 border flex flex-col justify-between ${
                  isAvailable
                    ? 'border-slate-800 hover:border-amber-500/50 cursor-pointer shadow-lg'
                    : 'border-slate-800/40 opacity-50 cursor-not-allowed bg-slate-950/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{domain.badge}</span>
                    {isAvailable ? (
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        Available in {currentLevelId}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-800 px-2.5 py-1 rounded-full">
                        <Lock className="w-3 h-3" /> Unlocks in Advanced
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{domain.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {domain.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    {isAvailable ? 'Realistic Scenarios Ready' : 'Locked Tier'}
                  </span>
                  {isAvailable && (
                    <button className="btn-gold px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                      <span>Enter</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Informational Guidance */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
          <Info className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200">Domain Flexibility Rule:</strong> You are not locked into a single domain. You can practice Civil in Basic, switch to Criminal in Medium, or Conveyancing in Advanced whenever you wish.
          </div>
        </div>
      </div>
    </div>
  );
};
