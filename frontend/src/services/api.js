// frontend/src/services/api.js
// Centralized API client for communicating with the LegalDraft backend.

const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('legaldraft_token') || null;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('legaldraft_token', token);
    } else {
      localStorage.removeItem('legaldraft_token');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...(options.headers || {})
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      return data;
    } catch (error) {
      console.warn(`API request to ${endpoint} failed:`, error.message);
      throw error;
    }
  }

  // --- AUTH ---
  register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  getMe() {
    return this.request('/auth/me');
  }

  updateLanguage(languageId) {
    return this.request('/auth/me/language', {
      method: 'PUT',
      body: JSON.stringify({ languageId })
    });
  }

  getLanguages() {
    return this.request('/auth/languages');
  }

  // --- DIAGNOSTIC ---
  getDiagnosticQuestions() {
    return this.request('/diagnostic/questions');
  }

  submitDiagnostic(answers) {
    return this.request('/diagnostic/submit', {
      method: 'POST',
      body: JSON.stringify({ answers })
    });
  }

  getDiagnosticResult() {
    return this.request('/diagnostic/result');
  }

  // --- LEARNING & LESSONS ---
  getLearningPath() {
    return this.request('/learning/path');
  }

  getLessons() {
    return this.request('/learning/lessons');
  }

  getLessonById(id) {
    return this.request(`/learning/lessons/${id}`);
  }

  completeLesson(id) {
    return this.request(`/learning/lessons/${id}/complete`, {
      method: 'POST'
    });
  }

  getQuizGateQuestions() {
    return this.request('/learning/quiz/gate');
  }

  submitQuizGate(answers) {
    return this.request('/learning/quiz/gate/submit', {
      method: 'POST',
      body: JSON.stringify({ answers })
    });
  }

  // --- DOMAINS & SCENARIOS ---
  getAvailableDomains() {
    return this.request('/scenarios/domains');
  }

  getScenariosByDomain(domainId, levelId) {
    return this.request(`/scenarios/domains/${domainId}/scenarios?level=${levelId || ''}`);
  }

  getScenarioById(id) {
    return this.request(`/scenarios/scenarios/${id}`);
  }

  // --- DRAFTING & AI EVALUATION ---
  saveDraft(scenarioId, draftText) {
    return this.request(`/drafting/scenarios/${scenarioId}/drafts`, {
      method: 'POST',
      body: JSON.stringify({ draftText })
    });
  }

  submitForAIEvaluation(scenarioId, draftText) {
    return this.request(`/drafting/scenarios/${scenarioId}/evaluate`, {
      method: 'POST',
      body: JSON.stringify({ draftText })
    });
  }

  getDraftSubmission(scenarioId) {
    return this.request(`/drafting/scenarios/${scenarioId}/submission`);
  }

  // --- ASSESSMENTS ---
  getLevelAssessment(levelId) {
    return this.request(`/assessment/levels/${levelId}`);
  }

  submitLevelAssessment(levelId, answers) {
    return this.request(`/assessment/levels/${levelId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers })
    });
  }

  getFinalAssessment() {
    return this.request('/assessment/final');
  }

  submitFinalAssessment(answers, practicalDraft) {
    return this.request('/assessment/final/submit', {
      method: 'POST',
      body: JSON.stringify({ answers, practicalDraft })
    });
  }

  // --- PORTFOLIO & GAMIFICATION ---
  getPortfolio() {
    return this.request('/portfolio');
  }

  getCertificates() {
    return this.request('/certificates');
  }

  verifyCertificate(code) {
    return this.request(`/certificates/verify/${code}`);
  }

  getGamificationStats() {
    return this.request('/gamification/stats');
  }
}

export const api = new ApiService();
