// backend/src/models/db.js
// In-Memory Database Store with initial seed data, relational query helpers, and JSON persistence support.

import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import {
  seedLanguages,
  seedLevels,
  seedDomains,
  seedDiagnosticQuestions,
  seedLessons,
  seedQuizQuestions,
  seedScenarios,
  seedBadges,
  seedLevelTests,
  seedFinalAssessment
} from '../data/seedData.js';

class InMemoryDB {
  constructor() {
    this.languages = [...seedLanguages];
    this.levels = [...seedLevels];
    this.domains = [...seedDomains];
    this.diagnosticQuestions = [...seedDiagnosticQuestions];
    this.lessons = [...seedLessons];
    this.quizQuestions = [...seedQuizQuestions];
    this.scenarios = [...seedScenarios];
    this.badges = [...seedBadges];
    this.levelTests = seedLevelTests;
    this.finalAssessment = seedFinalAssessment;

    // Relational Tables
    this.users = [];
    this.diagnosticAttempts = [];
    this.lessonProgress = [];
    this.quizAttempts = [];
    this.draftSubmissions = [];
    this.draftVersions = [];
    this.aiEvaluations = [];
    this.levelTestAttempts = [];
    this.finalAssessmentAttempts = [];
    this.certificates = [];
    this.portfolioItems = [];
    this.notifications = [];

    this._initializeDemoData();
  }

  _initializeDemoData() {
    // Seed default demo student
    const defaultPasswordHash = bcrypt.hashSync('Student@123', 10);
    const demoStudent = {
      id: 'user-demo-student-001',
      name: 'Aditya Sharma',
      email: 'student@lawcollege.edu',
      passwordHash: defaultPasswordHash,
      role: 'STUDENT',
      languageId: 'en',
      currentLevelId: 'BASIC',
      unlockedLevels: ['BASIC'],
      xp: 150,
      streakDays: 4,
      lastActivityDate: new Date().toISOString(),
      badges: ['first_lesson'],
      isDiagnosticCompleted: false,
      isDraftingBasicsCompleted: false,
      isQuizGatePassed: false,
      institution: 'National Law School of India',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.users.push(demoStudent);

    // Seed default admin
    const demoAdmin = {
      id: 'user-admin-001',
      name: 'Prof. Lakshmi Narayanan',
      email: 'admin@lawcollege.edu',
      passwordHash: defaultPasswordHash,
      role: 'ADMIN',
      languageId: 'en',
      currentLevelId: 'ADVANCED',
      unlockedLevels: ['BASIC', 'MEDIUM', 'ADVANCED'],
      xp: 1500,
      streakDays: 30,
      badges: seedBadges.map(b => b.id),
      isDiagnosticCompleted: true,
      isDraftingBasicsCompleted: true,
      isQuizGatePassed: true,
      institution: 'Faculty of Law, National University',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.users.push(demoAdmin);
  }

  // --- USER HELPERS ---
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  createUser(userData) {
    const newUser = {
      id: uuidv4(),
      role: 'STUDENT',
      languageId: 'en',
      currentLevelId: 'BASIC',
      unlockedLevels: ['BASIC'],
      xp: 0,
      streakDays: 1,
      lastActivityDate: new Date().toISOString(),
      badges: [],
      isDiagnosticCompleted: false,
      isDraftingBasicsCompleted: false,
      isQuizGatePassed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...userData
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, updates) {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) return null;
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return this.users[userIndex];
  }

  addXP(userId, points, reason = '') {
    const user = this.findUserById(userId);
    if (!user) return null;
    const newXP = (user.xp || 0) + points;
    user.xp = newXP;
    
    // Create notification
    this.addNotification(userId, `+${points} XP Earned!`, reason || 'Keep up the great work in your drafting journey.', 'XP_REWARD');
    return newXP;
  }

  awardBadge(userId, badgeId) {
    const user = this.findUserById(userId);
    if (!user) return false;
    if (!user.badges) user.badges = [];
    if (!user.badges.includes(badgeId)) {
      user.badges.push(badgeId);
      const badge = this.badges.find(b => b.id === badgeId);
      if (badge) {
        this.addXP(userId, badge.xp || 50, `Unlocked Badge: ${badge.name}`);
        this.addNotification(userId, `🏆 Badge Unlocked: ${badge.name}`, badge.description, 'BADGE_EARNED');
      }
      return true;
    }
    return false;
  }

  addNotification(userId, title, message, type = 'GENERAL') {
    const notif = {
      id: uuidv4(),
      userId,
      title,
      message,
      type,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    this.notifications.unshift(notif);
    return notif;
  }
}

export const db = new InMemoryDB();
