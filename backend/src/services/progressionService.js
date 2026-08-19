// backend/src/services/progressionService.js
// Business rules and progression engine enforcing level unlocking, diagnostic scoring, and certificate eligibility.

import { v4 as uuidv4 } from 'uuid';
import { db } from '../models/db.js';
import { config } from '../config/index.js';

export class ProgressionService {
  /**
   * Determine starting level from diagnostic percentage score
   */
  static determineLevelFromDiagnosticScore(percentage) {
    if (percentage >= config.levelThresholds.ADVANCED.min) {
      return {
        levelId: 'ADVANCED',
        unlockedLevels: ['BASIC', 'MEDIUM', 'ADVANCED'],
        label: 'Advanced Level 🏆',
        description: 'Demonstrated superior proficiency in legal drafting, statutory analysis, and procedural drafting.'
      };
    } else if (percentage >= config.levelThresholds.MEDIUM.min) {
      return {
        levelId: 'MEDIUM',
        unlockedLevels: ['BASIC', 'MEDIUM'],
        label: 'Medium Level ⚡',
        description: 'Demonstrated solid grasp of legal drafting principles, ready for multi-issue drafting scenarios.'
      };
    } else {
      return {
        levelId: 'BASIC',
        unlockedLevels: ['BASIC'],
        label: 'Basic Level 🌱',
        description: 'Starting with guided drafting practice, foundational notices, and basic dispute documents.'
      };
    }
  }

  /**
   * Get user learning roadmap and completion status
   */
  static getUserRoadmap(user) {
    const completedLessonsCount = db.lessonProgress.filter(
      lp => lp.userId === user.id && lp.status === 'COMPLETED'
    ).length;

    const totalLessons = db.lessons.length;
    const isBasicsDone = completedLessonsCount >= totalLessons;

    const quizAttempt = db.quizAttempts
      .filter(qa => qa.userId === user.id && qa.passed)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

    const draftsCount = db.draftSubmissions.filter(d => d.userId === user.id).length;
    const certificate = db.certificates.find(c => c.userId === user.id);

    return {
      userId: user.id,
      currentLevelId: user.currentLevelId,
      unlockedLevels: user.unlockedLevels || ['BASIC'],
      isDiagnosticCompleted: user.isDiagnosticCompleted,
      isDraftingBasicsCompleted: isBasicsDone,
      completedLessonsCount,
      totalLessons,
      isQuizGatePassed: !!quizAttempt,
      draftsCount,
      certificate: certificate || null,
      xp: user.xp || 0,
      streakDays: user.streakDays || 1,
      badges: user.badges || []
    };
  }

  /**
   * Complete lesson progress
   */
  static completeLesson(userId, lessonId) {
    let progress = db.lessonProgress.find(
      lp => lp.userId === userId && lp.lessonId === lessonId
    );

    if (!progress) {
      progress = {
        id: uuidv4(),
        userId,
        lessonId,
        status: 'COMPLETED',
        completedAt: new Date().toISOString()
      };
      db.lessonProgress.push(progress);

      // Award XP
      db.addXP(userId, config.xpRewards.LESSON_COMPLETED, `Completed Lesson ${lessonId}`);
      db.awardBadge(userId, 'first_lesson');
    }

    // Check if all 8 lessons completed
    const completedCount = db.lessonProgress.filter(
      lp => lp.userId === userId && lp.status === 'COMPLETED'
    ).length;

    const user = db.findUserById(userId);
    if (completedCount >= db.lessons.length && user) {
      db.updateUser(userId, { isDraftingBasicsCompleted: true });
    }

    return { progress, completedCount, totalLessons: db.lessons.length };
  }

  /**
   * Process quiz gate submission
   */
  static processQuizSubmission(userId, answers) {
    const questions = db.quizQuestions;
    let score = 0;

    const results = questions.map(q => {
      const selected = answers[q.id];
      const isCorrect = selected === q.correctOption;
      if (isCorrect) score += 10;
      return {
        questionId: q.id,
        selectedOption: selected,
        correctOption: q.correctOption,
        isCorrect,
        explanation: q.explanation
      };
    });

    const percentage = Math.round((score / (questions.length * 10)) * 100);
    const passed = percentage >= config.quizPassingPercentage;

    const attempt = {
      id: uuidv4(),
      userId,
      score,
      percentage,
      passed,
      results,
      createdAt: new Date().toISOString()
    };
    db.quizAttempts.push(attempt);

    if (passed) {
      db.updateUser(userId, { isQuizGatePassed: true });
      db.addXP(userId, config.xpRewards.QUIZ_PASSED, 'Passed Drafting Basics Quiz Gate!');
      db.awardBadge(userId, 'quiz_master');
    }

    return attempt;
  }

  /**
   * Process Level Test submission and unlock next tier
   */
  static processLevelTest(userId, levelId, answers) {
    const test = db.levelTests[levelId];
    if (!test) {
      throw new Error(`No level test found for level: ${levelId}`);
    }

    let correctCount = 0;
    const questions = test.questions;
    questions.forEach(q => {
      if (answers[q.id] === q.correctOption) correctCount++;
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const passed = percentage >= test.passingPercentage;

    const attempt = {
      id: uuidv4(),
      userId,
      levelId,
      score: correctCount * 25,
      percentage,
      passed,
      createdAt: new Date().toISOString()
    };
    db.levelTestAttempts.push(attempt);

    if (passed) {
      const user = db.findUserById(userId);
      const currentUnlocked = new Set(user.unlockedLevels || ['BASIC']);

      let nextLevel = user.currentLevelId;
      if (levelId === 'BASIC') {
        nextLevel = 'MEDIUM';
        currentUnlocked.add('MEDIUM');
      } else if (levelId === 'MEDIUM') {
        nextLevel = 'ADVANCED';
        currentUnlocked.add('ADVANCED');
      }

      db.updateUser(userId, {
        currentLevelId: nextLevel,
        unlockedLevels: Array.from(currentUnlocked)
      });

      db.addXP(userId, config.xpRewards.LEVEL_COMPLETED, `Completed ${levelId} Level Test!`);
      db.awardBadge(userId, 'level_master');
    }

    return attempt;
  }

  /**
   * Generate official certificate upon final assessment completion
   */
  static generateCertificate(userId, finalScore = 88) {
    const user = db.findUserById(userId);
    if (!user) throw new Error('User not found');

    const existingCert = db.certificates.find(c => c.userId === userId);
    if (existingCert) return existingCert;

    const verificationCode = `LD-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const certificateNumber = `CERT-LD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const cert = {
      id: uuidv4(),
      userId: user.id,
      recipientName: user.name,
      institution: user.institution || 'National Law School of India',
      courseName: 'Comprehensive Legal Drafting & Practice Certification',
      certificateNumber,
      verificationCode,
      score: finalScore,
      issuedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      certificateUrl: `/api/certificates/verify/${verificationCode}`,
      createdAt: new Date().toISOString()
    };

    db.certificates.push(cert);
    db.addXP(userId, config.xpRewards.FINAL_ASSESSMENT_PASSED, 'Earned Legal Drafting Certificate!');
    db.awardBadge(userId, 'legal_scholar');

    return cert;
  }
}
