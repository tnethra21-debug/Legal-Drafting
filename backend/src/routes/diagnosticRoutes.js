// backend/src/routes/diagnosticRoutes.js
import express from 'express';
import { getDiagnosticQuestions, submitDiagnostic, getDiagnosticResult } from '../controllers/diagnosticController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/questions', getDiagnosticQuestions);
router.post('/submit', authenticateToken, submitDiagnostic);
router.get('/result', authenticateToken, getDiagnosticResult);

export default router;
