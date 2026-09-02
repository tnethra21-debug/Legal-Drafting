// frontend/src/App.jsx
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Footer } from './components/Footer.jsx';
import { BadgeModal } from './components/BadgeModal.jsx';

import { LandingPage } from './pages/LandingPage.jsx';
import { AuthPage } from './pages/AuthPage.jsx';
import { DiagnosticPage } from './pages/DiagnosticPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { DraftingBasicsPage } from './pages/DraftingBasicsPage.jsx';
import { QuizGatePage } from './pages/QuizGatePage.jsx';
import { DomainSelectionPage } from './pages/DomainSelectionPage.jsx';
import { ScenarioSelectionPage } from './pages/ScenarioSelectionPage.jsx';
import { DraftingWorkspacePage } from './pages/DraftingWorkspacePage.jsx';
import { LevelTestPage } from './pages/LevelTestPage.jsx';
import { FinalAssessmentPage } from './pages/FinalAssessmentPage.jsx';
import { CertificatePage } from './pages/CertificatePage.jsx';
import { PortfolioPage } from './pages/PortfolioPage.jsx';

function MainApp() {
  const { user, unlockedBadge, setUnlockedBadge } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [screenParams, setScreenParams] = useState({});

  const handleNavigate = (screen, params = {}) => {
    // If navigating to obsolete language select, redirect to diagnostic
    if (screen === 'language-select') {
      setCurrentScreen('diagnostic');
    } else {
      setCurrentScreen(screen);
    }
    setScreenParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'auth':
        return <AuthPage mode={screenParams.mode || 'login'} onNavigate={handleNavigate} />;
      case 'diagnostic':
        return <DiagnosticPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'basics':
        return <DraftingBasicsPage onNavigate={handleNavigate} />;
      case 'quiz-gate':
        return <QuizGatePage onNavigate={handleNavigate} />;
      case 'domains':
        return <DomainSelectionPage onNavigate={handleNavigate} />;
      case 'scenarios':
        return (
          <ScenarioSelectionPage
            domainId={screenParams.domainId || 'civil'}
            levelId={screenParams.levelId || user?.currentLevelId || 'BASIC'}
            onNavigate={handleNavigate}
          />
        );
      case 'workspace':
        return (
          <DraftingWorkspacePage
            scenarioId={screenParams.scenarioId || 'scen-basic-civil-1'}
            onNavigate={handleNavigate}
          />
        );
      case 'level-test':
        return (
          <LevelTestPage
            level={screenParams.level || user?.currentLevelId || 'BASIC'}
            onNavigate={handleNavigate}
          />
        );
      case 'final-assessment':
        return <FinalAssessmentPage onNavigate={handleNavigate} />;
      case 'certificate':
        return <CertificatePage onNavigate={handleNavigate} />;
      case 'portfolio':
        return <PortfolioPage onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 selection:bg-amber-100 selection:text-amber-900 antialiased font-sans">
      <Navbar currentScreen={currentScreen} onNavigate={handleNavigate} />
      <main className="flex-1">{renderScreen()}</main>
      <Footer />
      {unlockedBadge && (
        <BadgeModal
          badge={unlockedBadge}
          onClose={() => setUnlockedBadge(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
