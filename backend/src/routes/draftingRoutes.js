// backend/src/routes/draftingRoutes.js
import express from 'express';
import { saveDraft, submitAndEvaluateDraft, getDraftSubmission } from '../controllers/draftingController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/scenarios/:scenarioId/drafts', saveDraft);
router.post('/scenarios/:scenarioId/evaluate', submitAndEvaluateDraft);
router.get('/scenarios/:scenarioId/submission', getDraftSubmission);

export default router;
