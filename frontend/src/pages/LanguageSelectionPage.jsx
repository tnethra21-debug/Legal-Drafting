// frontend/src/pages/LanguageSelectionPage.jsx
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { Globe, ArrowRight, CheckCircle2, Info } from 'lucide-react';

export const LanguageSelectionPage = ({ onNavigate }) => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState(currentLanguage || 'en');

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇬🇧',
      description: 'Full course instructions and scenario facts in English.',
      draftingLang: 'Standard Legal English'
    },
    {
      code: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      flag: '🇮🇳',
      description: 'சூழ்நிலைகள் மற்றும் விளக்கங்கள் தமிழில் வழங்கப்படும்.',
      draftingLang: 'Standard Legal English'
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      flag: '🇮🇳',
      description: 'परिदृश्यों और पाठों की व्याख्या हिंदी में उपलब्ध होगी।',
      draftingLang: 'Standard Legal English'
    }
  ];

  const handleContinue = () => {
    setLanguage(selectedLang);
    onNavigate('diagnostic');
  };

  return (
    <div className="min-h-screen mesh-gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl glass-card p-6 sm:p-10 border border-slate-800 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-3">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t('selectLanguage')}
          </h2>
          <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
            {t('selectLanguageDesc')}
          </p>
        </div>

        {/* Language Selection Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {languages.map((lang) => {
            const isSelected = selectedLang === lang.code;
            return (
              <div
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{lang.flag}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {lang.name}
                  </h3>
                  <div className="text-xs font-semibold text-amber-400/90 mb-2">
                    {lang.nativeName}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 text-[10px] text-slate-500 font-medium">
                  Drafting: {lang.draftingLang}
                </div>
              </div>
            );
          })}
        </div>

        {/* Explanatory Alert */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 mb-8">
          <Info className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block mb-0.5">Note on Language & Progression:</span>
            Your language preference customizes instructional guidance. Level assignment (Basic, Medium, Advanced) is strictly determined by your upcoming Diagnostic Assessment.
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            className="w-full sm:w-auto btn-gold px-8 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <span>Continue to Diagnostic</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
