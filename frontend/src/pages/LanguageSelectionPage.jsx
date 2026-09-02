// frontend/src/pages/LanguageSelectionPage.jsx
// Multilingual page removed — redirects immediately to diagnostic.
import React, { useEffect } from 'react';

export const LanguageSelectionPage = ({ onNavigate }) => {
  useEffect(() => {
    onNavigate('diagnostic');
  }, [onNavigate]);

  return null;
};
