import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'legaldraft-super-secret-jwt-key-2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Progression thresholds
  levelThresholds: {
    BASIC: { min: 0, max: 49 },
    MEDIUM: { min: 50, max: 79 },
    ADVANCED: { min: 80, max: 100 }
  },
  
  quizPassingPercentage: 70,
  levelTestPassingPercentage: 75,
  finalAssessmentPassingPercentage: 80,
  
  // XP Rewards
  xpRewards: {
    LESSON_COMPLETED: 10,
    QUIZ_PASSED: 25,
    DRAFT_SUBMITTED: 20,
    DRAFT_IMPROVED: 30,
    LEVEL_COMPLETED: 100,
    FINAL_ASSESSMENT_PASSED: 250
  }
};
