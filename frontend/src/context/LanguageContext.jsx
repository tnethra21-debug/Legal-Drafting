// frontend/src/context/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api.js';

const translations = {
  en: {
    appName: 'LegalDraft',
    tagline: 'Master Legal Drafting with Grounded AI Feedback',
    getStarted: 'Get Started',
    login: 'Login',
    createAccount: 'Create Account',
    learningLoop: 'Learn → Practice → Draft → AI Feedback → Improve → Redraft → Test → Unlock',
    selectLanguage: 'Choose Your Language',
    selectLanguageDesc: 'Select your preferred language for learning content and instructions.',
    diagnosticTitle: "Let's Check Your Skills 🎯",
    diagnosticSubtitle: 'Answer 5 questions to automatically determine your personalized starting level.',
    startAssessment: 'Start Assessment',
    currentLevel: 'Current Level',
    draftingBasics: 'Drafting Basics',
    quizGate: 'Quiz Gate',
    chooseDomain: 'Choose Your Domain',
    startDrafting: 'Start Drafting',
    submitForAI: 'Submit for AI Review',
    saveDraft: 'Save Draft',
    aiFeedback: 'AI Drafting Feedback',
    overallScore: 'Overall Score',
    clarity: 'Clarity',
    structure: 'Structure',
    completeness: 'Completeness',
    precision: 'Precision',
    legalAccuracy: 'Legal Accuracy',
    strengths: 'Strengths',
    improvements: 'Areas for Improvement',
    missingElements: 'Missing Legal Requisites',
    improveDraft: 'Improve / Redraft',
    takeLevelTest: 'Take Level Test',
    finalAssessment: 'Final Assessment',
    portfolio: 'My Portfolio',
    certificate: 'Official Certificate',
    xp: 'XP',
    streak: 'Day Streak',
    logout: 'Logout'
  },
  ta: {
    appName: 'லீகல் டிராஃப்ட்',
    tagline: 'சட்ட வரைவு கலையை AI வழிகாட்டலுடன் கற்றுக்கொள்ளுங்கள்',
    getStarted: 'தொடங்குங்கள்',
    login: 'உள்நுழைக',
    createAccount: 'கணக்கை உருவாக்கவும்',
    learningLoop: 'கற்றல் → பயிற்சி → வரைவு → AI பின்னூட்டம் → மேம்படுத்தல் → மறுவரைவு → தேர்வு → திறத்தல்',
    selectLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    selectLanguageDesc: 'பயிற்சி மற்றும் சூழ்நிலைகளுக்கான உங்கள் விருப்ப மொழியைத் தேர்ந்தெடுக்கவும்.',
    diagnosticTitle: 'உங்கள் திறனைச் சோதிப்போம் 🎯',
    diagnosticSubtitle: 'உங்களுக்கான சரியான கற்றல் நிலையைத் தானாக அறிய 5 கேள்விகளுக்குப் பதிலளிக்கவும்.',
    startAssessment: 'மதிப்பீட்டைத் தொடங்குங்கள்',
    currentLevel: 'தற்போதைய நிலை',
    draftingBasics: 'வரைவு அடிப்படைகள்',
    quizGate: 'வினாடி வினா வாயில்',
    chooseDomain: 'உங்கள் சட்டப் பிரிவைத் தேர்ந்தெடுக்கவும்',
    startDrafting: 'வரைவைத் தொடங்குங்கள்',
    submitForAI: 'AI மதிப்பாய்வுக்குச் சமர்ப்பிக்கவும்',
    saveDraft: 'சேமிக்கவும்',
    aiFeedback: 'AI வரைவு பின்னூட்டம்',
    overallScore: 'மொத்த மதிப்பெண்',
    clarity: 'தெளிவு',
    structure: 'கட்டமைப்பு',
    completeness: 'முழுமை',
    precision: 'துல்லியம்',
    legalAccuracy: 'சட்ட துல்லியம்',
    strengths: 'சிறப்பம்சங்கள்',
    improvements: 'மேம்படுத்த வேண்டியவை',
    missingElements: 'விடுபட்ட சட்டக் கூறுகள்',
    improveDraft: 'மேம்படுத்தி மறுவரைவு செய்க',
    takeLevelTest: 'நிலைத் தேர்வு எழுதுங்கள்',
    finalAssessment: 'இறுதி மதிப்பீடு',
    portfolio: 'எனது ஆவணத் தொகுப்பு',
    certificate: 'அங்கீகரிக்கப்பட்ட சான்றிதழ்',
    xp: 'புள்ளிகள் (XP)',
    streak: 'தொடர் நாட்கள்',
    logout: 'வெளியேறு'
  },
  hi: {
    appName: 'लीगल ड्राफ्ट',
    tagline: 'सटीक AI फीडबैक के साथ कानूनी प्रारूपण में महारत हासिल करें',
    getStarted: 'शुरू करें',
    login: 'लॉग इन करें',
    createAccount: 'खाता बनाएं',
    learningLoop: 'सीखें → अभ्यास → प्रारूपण → AI प्रतिक्रिया → सुधार → पुनः प्रारूपण → परीक्षा → अनलॉक',
    selectLanguage: 'अपनी भाषा चुनें',
    selectLanguageDesc: 'सीखने की सामग्री और निर्देशों के लिए अपनी पसंदीदा भाषा चुनें।',
    diagnosticTitle: 'आइए अपने कौशल की जांच करें 🎯',
    diagnosticSubtitle: 'अपने शुरुआती स्तर को स्वचालित रूप से निर्धारित करने के लिए 5 प्रश्नों के उत्तर दें।',
    startAssessment: 'मूल्यांकन शुरू करें',
    currentLevel: 'वर्तमान स्तर',
    draftingBasics: 'प्रारूपण मूल बातें',
    quizGate: 'प्रश्नोत्तरी द्वार',
    chooseDomain: 'अपना कानूनी क्षेत्र चुनें',
    startDrafting: 'प्रारूपण शुरू करें',
    submitForAI: 'AI समीक्षा के लिए सबमिट करें',
    saveDraft: 'ड्राफ्ट सहेजें',
    aiFeedback: 'AI प्रारूपण प्रतिक्रिया',
    overallScore: 'कुल स्कोर',
    clarity: 'स्पष्टता',
    structure: 'संरचना',
    completeness: 'पूर्णता',
    precision: 'परिशुद्धता',
    legalAccuracy: 'कानूनी सटीकता',
    strengths: 'मजबूत पक्ष',
    improvements: 'सुधार के क्षेत्र',
    missingElements: 'लापता कानूनी आवश्यकताएं',
    improveDraft: 'सुधारें और पुनः ड्राफ्ट करें',
    takeLevelTest: 'स्तर परीक्षा दें',
    finalAssessment: 'अंतिम मूल्यांकन',
    portfolio: 'मेरा पोर्टफोलियो',
    certificate: 'आधिकारिक प्रमाण पत्र',
    xp: 'अंक (XP)',
    streak: 'दैनिक स्ट्रीक',
    logout: 'लॉग आउट'
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('legaldraft_lang') || 'en'
  );

  const setLanguage = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('legaldraft_lang', langCode);
    api.updateLanguage(langCode).catch(() => {});
  };

  const t = (key) => {
    const dict = translations[currentLanguage] || translations.en;
    return dict[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
