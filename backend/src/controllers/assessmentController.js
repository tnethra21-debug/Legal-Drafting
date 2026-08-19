// backend/src/controllers/assessmentController.js
import { db } from '../models/db.js';
import { ProgressionService } from '../services/progressionService.js';

export const getLevelAssessment = (req, res) => {
  try {
    const { level } = req.params;
    const test = db.levelTests[level.toUpperCase()];

    if (!test) {
      return res.status(404).json({ success: false, message: `No test found for level: ${level}` });
    }

    const safeQuestions = test.questions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options
    }));

    return res.status(200).json({
      success: true,
      test: {
        levelId: test.levelId,
        title: test.title,
        passingPercentage: test.passingPercentage,
        questions: safeQuestions
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const submitLevelAssessment = (req, res) => {
  try {
    const { level } = req.params;
    const { answers } = req.body;

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ success: false, message: 'Answers object is required.' });
    }

    const attempt = ProgressionService.processLevelTest(req.user.id, level.toUpperCase(), answers);

    return res.status(200).json({
      success: true,
      message: attempt.passed
        ? `🎉 Passed! You unlocked the next level!`
        : `Assessment not cleared (${attempt.percentage}%). Review feedback and retry.`,
      result: attempt
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getFinalAssessment = (req, res) => {
  try {
    const assessment = db.finalAssessment;
    return res.status(200).json({ success: true, assessment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const submitFinalAssessment = (req, res) => {
  try {
    const { answers, practicalDraft } = req.body;
    const assessment = db.finalAssessment;

    let score = 0;
    const totalQuestions = assessment.sections[0].questions.length;

    assessment.sections[0].questions.forEach(q => {
      if (answers && answers[q.id] === q.correctOption) score += 40;
    });

    if (practicalDraft && practicalDraft.trim().length > 30) {
      score += 20; // Practical draft score bonus
    }

    const percentage = Math.round((score / 100) * 100);
    const passed = percentage >= assessment.passingPercentage;

    let certificate = null;
    if (passed) {
      certificate = ProgressionService.generateCertificate(req.user.id, percentage);
    }

    return res.status(200).json({
      success: true,
      message: passed ? '🎓 Congratulations! You graduated the Legal Drafting Program!' : 'Not yet passed. Try again.',
      score,
      percentage,
      passed,
      certificate
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
