// backend/src/controllers/diagnosticController.js
import { v4 as uuidv4 } from 'uuid';
import { db } from '../models/db.js';
import { ProgressionService } from '../services/progressionService.js';

export const getDiagnosticQuestions = (req, res) => {
  try {
    // Return questions with options (omitting correct answers from client payload)
    const questions = db.diagnosticQuestions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options
    }));

    return res.status(200).json({ success: true, questions });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const submitDiagnostic = (req, res) => {
  try {
    const { answers } = req.body; // { 'diag-1': 'A', 'diag-2': 'B', ... }

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ success: false, message: 'Answers object is required.' });
    }

    const questions = db.diagnosticQuestions;
    let earnedWeight = 0;
    let totalWeight = 0;

    const breakdown = questions.map(q => {
      totalWeight += q.weight;
      const selected = answers[q.id];
      const isCorrect = selected === q.correctOption;
      if (isCorrect) earnedWeight += q.weight;

      return {
        questionId: q.id,
        selectedOption: selected,
        correctOption: q.correctOption,
        isCorrect,
        rationale: q.rationale
      };
    });

    const percentage = Math.round((earnedWeight / totalWeight) * 100);
    const assignedLevel = ProgressionService.determineLevelFromDiagnosticScore(percentage);

    // Record attempt
    const attempt = {
      id: uuidv4(),
      userId: req.user.id,
      score: earnedWeight,
      totalPossible: totalWeight,
      percentage,
      assignedLevel: assignedLevel.levelId,
      breakdown,
      createdAt: new Date().toISOString()
    };
    db.diagnosticAttempts.push(attempt);

    // Update user state in database
    db.updateUser(req.user.id, {
      currentLevelId: assignedLevel.levelId,
      unlockedLevels: assignedLevel.unlockedLevels,
      isDiagnosticCompleted: true
    });

    db.addXP(req.user.id, 50, 'Completed Diagnostic Assessment');

    return res.status(200).json({
      success: true,
      message: 'Diagnostic assessment evaluated successfully.',
      result: {
        score: earnedWeight,
        totalPossible: totalWeight,
        percentage,
        assignedLevel: assignedLevel.levelId,
        levelLabel: assignedLevel.label,
        levelDescription: assignedLevel.description,
        unlockedLevels: assignedLevel.unlockedLevels,
        breakdown
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getDiagnosticResult = (req, res) => {
  try {
    const attempt = db.diagnosticAttempts
      .filter(a => a.userId === req.user.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'No diagnostic attempt found.' });
    }

    const assignedLevel = ProgressionService.determineLevelFromDiagnosticScore(attempt.percentage);

    return res.status(200).json({
      success: true,
      result: {
        ...attempt,
        levelLabel: assignedLevel.label,
        levelDescription: assignedLevel.description
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
