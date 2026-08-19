// backend/src/controllers/scenarioController.js
import { db } from '../models/db.js';

export const getAvailableDomains = (req, res) => {
  try {
    const userLevel = req.user.currentLevelId || 'BASIC';
    const domains = db.domains.map(d => ({
      ...d,
      isAvailable: d.levels.includes(userLevel)
    }));

    return res.status(200).json({
      success: true,
      currentLevelId: userLevel,
      unlockedLevels: req.user.unlockedLevels || ['BASIC'],
      domains
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getScenariosByDomain = (req, res) => {
  try {
    const { domain } = req.params;
    const requestedLevel = req.query.level || req.user.currentLevelId || 'BASIC';

    // Verify user has unlocked the requested level
    const userUnlocked = req.user.unlockedLevels || ['BASIC'];
    if (!userUnlocked.includes(requestedLevel) && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: `Level ${requestedLevel} is locked. Complete previous level assessments to unlock.`
      });
    }

    const domainObj = db.domains.find(d => d.id === domain);
    if (!domainObj) {
      return res.status(404).json({ success: false, message: 'Domain not found.' });
    }

    const scenarios = db.scenarios.filter(
      s => s.domainId === domain && s.levelId === requestedLevel
    );

    // Attach user submission status to each scenario
    const userSubmissions = db.draftSubmissions.filter(d => d.userId === req.user.id);
    const scenariosWithStatus = scenarios.map(s => {
      const sub = userSubmissions.find(u => u.scenarioId === s.id);
      return {
        ...s,
        isCompleted: !!sub,
        submissionScore: sub?.latestEvaluation?.overallScore || null,
        attemptCount: sub?.attemptsCount || 0
      };
    });

    return res.status(200).json({
      success: true,
      domain: domainObj,
      levelId: requestedLevel,
      scenarios: scenariosWithStatus
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getScenarioById = (req, res) => {
  try {
    const { id } = req.params;
    const scenario = db.scenarios.find(s => s.id === id);

    if (!scenario) {
      return res.status(404).json({ success: false, message: 'Scenario not found.' });
    }

    // Check if user has an existing draft or submissions
    const submission = db.draftSubmissions.find(
      s => s.userId === req.user.id && s.scenarioId === id
    );

    return res.status(200).json({
      success: true,
      scenario,
      submission: submission || null
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
