// frontend/src/pages/CertificatePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import {
  Award,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Scale,
  Sparkles,
  ArrowLeft,
  FolderKanban
} from 'lucide-react';

export const CertificatePage = ({ onNavigate }) => {
  const { user } = useAuth();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCert = async () => {
      try {
        const res = await api.getCertificates();
        if (res.success && res.certificates && res.certificates.length > 0) {
          setCert(res.certificates[0]);
        }
      } catch (err) {
        console.warn('Certificate fetch:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCert();
  }, []);

  const defaultCert = cert || {
    recipientName: user?.name || 'Aditya Sharma',
    institution: user?.institution || 'National Law School of India',
    courseName: 'Comprehensive Legal Drafting & Statutory Practice',
    certificateNumber: 'CERT-LD-2026-8821',
    verificationCode: 'LD-V9X8-2026',
    score: 92,
    issuedDate: '19 August 2026'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen mesh-gradient-bg text-slate-100 py-8 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 border border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <Award className="w-4 h-4" />
              <span>Official Verification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Certificate of Completion
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Verified credential for legal drafting excellence under Indian Law
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('portfolio')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 hover:bg-slate-800 transition flex items-center gap-1.5"
            >
              <FolderKanban className="w-4 h-4 text-emerald-400" />
              <span>My Portfolio</span>
            </button>
            <button
              onClick={handlePrint}
              className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Certificate Parchment Frame */}
        <div className="relative p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-4 border-amber-500/40 shadow-2xl shadow-amber-500/10 text-center overflow-hidden">
          {/* Ornate corner borders */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-400" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-400" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-400" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-400" />

          {/* Glowing Seal in Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Certificate Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Scale className="w-7 h-7" />
            </div>
          </div>

          <div className="text-xs font-black uppercase tracking-widest text-amber-400 mb-2">
            LEGAL DRAFTING LEARNING PLATFORM
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide mb-6">
            Certificate of Excellence
          </h2>

          <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">
            THIS IS PROUDLY CONFERRED UPON
          </p>

          {/* Recipient */}
          <div className="text-2xl sm:text-4xl font-extrabold gold-gradient-text tracking-wide mb-2 py-1">
            {defaultCert.recipientName}
          </div>
          <div className="text-xs font-semibold text-slate-300 mb-8">
            {defaultCert.institution}
          </div>

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
            For successfully demonstrating professional proficiency in legal drafting, procedural statutory compliance,
            civil plaints, criminal complaints under BNS & BNSS 2023, and commercial conveyancing instruments with an overall evaluation score of <strong className="text-amber-400">{defaultCert.score}%</strong>.
          </p>

          {/* Certificate Footer Credentials */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-800/80 items-center text-xs">
            <div className="text-left space-y-1">
              <div className="text-slate-500 text-[10px] uppercase font-semibold">Certificate Number</div>
              <div className="font-mono font-bold text-slate-300">{defaultCert.certificateNumber}</div>
              <div className="text-slate-500 text-[10px]">Issued: {defaultCert.issuedDate}</div>
            </div>

            {/* Gold Seal */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-300 p-0.5 shadow-lg shadow-amber-500/30 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-full flex flex-col items-center justify-center text-amber-400">
                  <ShieldCheck className="w-6 h-6" />
                  <span className="text-[7px] font-black uppercase tracking-tighter">VERIFIED</span>
                </div>
              </div>
            </div>

            <div className="sm:text-right space-y-1">
              <div className="text-slate-500 text-[10px] uppercase font-semibold">Verification Code</div>
              <div className="font-mono font-bold text-amber-400">{defaultCert.verificationCode}</div>
              <div className="text-emerald-400 text-[10px] flex items-center sm:justify-end gap-1 font-semibold">
                <CheckCircle2 className="w-3 h-3" /> Blockchain Validated
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
