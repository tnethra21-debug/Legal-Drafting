// backend/src/routes/assessmentRoutes.js
import express from 'express';
import {
  getLevelAssessment,
  submitLevelAssessment,
  getFinalAssessment,
  submitFinalAssessment
} from '../controllers/assessmentController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/levels/:level', getLevelAssessment);
router.post('/levels/:level/submit', submitLevelAssessment);
router.get('/final', getFinalAssessment);
router.post('/final/submit', submitFinalAssessment);

export default router;
