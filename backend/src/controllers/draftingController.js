// backend/src/controllers/draftingController.js
import { v4 as uuidv4 } from 'uuid';
import { db } from '../models/db.js';
import { AIEvaluationService } from '../services/aiEvaluationService.js';
import { config } from '../config/index.js';

export const saveDraft = (req, res) => {
  try {
    const { scenarioId } = req.params;
    const { draftText } = req.body;

    const scenario = db.scenarios.find(s => s.id === scenarioId);
    if (!scenario) {
      return res.status(404).json({ success: false, message: 'Scenario not found.' });
    }

    let submission = db.draftSubmissions.find(
      s => s.userId === req.user.id && s.scenarioId === scenarioId
    );

    if (!submission) {
      submission = {
        id: uuidv4(),
        userId: req.user.id,
        scenarioId,
        currentDraftText: draftText || scenario.template || '',
        status: 'DRAFT',
        attemptsCount: 0,
        versions: [],
        aiEvaluations: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      db.draftSubmissions.push(submission);
    } else {
      submission.currentDraftText = draftText || submission.currentDraftText;
      submission.updatedAt = new Date().toISOString();
    }

    return res.status(200).json({
      success: true,
      message: 'Draft saved.',
      submission
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const submitAndEvaluateDraft = (req, res) => {
  try {
    const { scenarioId } = req.params;
    const { draftText } = req.body;

    const scenario = db.scenarios.find(s => s.id === scenarioId);
    if (!scenario) {
      return res.status(404).json({ success: false, message: 'Scenario not found.' });
    }

    let submission = db.draftSubmissions.find(
      s => s.userId === req.user.id && s.scenarioId === scenarioId
    );

    const now = new Date().toISOString();

    if (!submission) {
      submission = {
        id: uuidv4(),
        userId: req.user.id,
        scenarioId,
        currentDraftText: draftText,
        status: 'SUBMITTED',
        attemptsCount: 1,
        versions: [],
        aiEvaluations: [],
        createdAt: now,
        updatedAt: now
      };
      db.draftSubmissions.push(submission);
    } else {
      submission.attemptsCount = (submission.attemptsCount || 0) + 1;
      submission.currentDraftText = draftText;
      submission.status = 'SUBMITTED';
      submission.updatedAt = now;
    }

    const versionNumber = submission.attemptsCount;

    // Record draft version
    const versionRecord = {
      id: uuidv4(),
      submissionId: submission.id,
      versionNumber,
      draftText,
      createdAt: now
    };
    submission.versions.push(versionRecord);
    db.draftVersions.push(versionRecord);

    // Run Grounded AI Evaluation
    const evaluationResult = AIEvaluationService.evaluateDraft({
      draftText,
      scenario,
      levelId: scenario.levelId,
      domainId: scenario.domainId,
      attemptNumber: versionNumber
    });

    const aiRecord = {
      id: uuidv4(),
      submissionId: submission.id,
      versionNumber,
      ...evaluationResult,
      createdAt: now
    };
    submission.aiEvaluations.push(aiRecord);
    submission.latestEvaluation = aiRecord;
    db.aiEvaluations.push(aiRecord);

    // Gamification & Portfolio updates
    const xpEarned = versionNumber === 1
      ? config.xpRewards.DRAFT_SUBMITTED
      : config.xpRewards.DRAFT_IMPROVED;

    db.addXP(req.user.id, xpEarned, `Submitted Draft v${versionNumber} for ${scenario.title}`);

    if (versionNumber > 1) {
      db.awardBadge(req.user.id, 'redraft_champion');
    }

    // Award domain specific badges
    if (scenario.domainId === 'civil') db.awardBadge(req.user.id, 'civil_drafter');
    if (scenario.domainId === 'criminal') db.awardBadge(req.user.id, 'criminal_drafter');
    if (scenario.domainId === 'conveyancing') db.awardBadge(req.user.id, 'conveyancing_pro');

    // Automatically sync or update portfolio item
    let portItem = db.portfolioItems.find(
      p => p.userId === req.user.id && p.scenarioId === scenario.id
    );

    if (!portItem) {
      portItem = {
        id: uuidv4(),
        userId: req.user.id,
        submissionId: submission.id,
        scenarioId: scenario.id,
        title: scenario.title,
        domainId: scenario.domainId,
        levelId: scenario.levelId,
        score: evaluationResult.overallScore,
        bestDraftText: draftText,
        aiSummary: evaluationResult.strengths[0] || 'Draft completed and reviewed.',
        attemptsCount: versionNumber,
        isFeatured: evaluationResult.overallScore >= 80,
        createdAt: now,
        updatedAt: now
      };
      db.portfolioItems.push(portItem);
    } else {
      if (evaluationResult.overallScore >= portItem.score) {
        portItem.score = evaluationResult.overallScore;
        portItem.bestDraftText = draftText;
        portItem.aiSummary = evaluationResult.strengths[0] || portItem.aiSummary;
      }
      portItem.attemptsCount = versionNumber;
      portItem.updatedAt = now;
    }

    return res.status(200).json({
      success: true,
      message: 'Draft evaluated by AI successfully.',
      versionNumber,
      evaluation: aiRecord,
      submission
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getDraftSubmission = (req, res) => {
  try {
    const { scenarioId } = req.params;
    const submission = db.draftSubmissions.find(
      s => s.userId === req.user.id && s.scenarioId === scenarioId
    );

    if (!submission) {
      return res.status(404).json({ success: false, message: 'No draft found for this scenario.' });
    }

    return res.status(200).json({ success: true, submission });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
