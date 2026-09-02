// frontend/src/context/LanguageContext.jsx
// Multilingual support removed — standard English only.
import React, { createContext, useContext } from 'react';

const LanguageContext = createContext({
  currentLanguage: 'en',
  setLanguage: () => {},
  t: (key) => key
});

export const LanguageProvider = ({ children }) => {
  return <>{children}</>;
};

export const useLanguage = () => useContext(LanguageContext);
