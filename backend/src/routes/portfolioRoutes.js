// backend/src/routes/portfolioRoutes.js
import express from 'express';
import {
  getPortfolio,
  getCertificates,
  verifyCertificate,
  getGamificationStats
} from '../controllers/portfolioController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public verification endpoint
router.get('/certificates/verify/:code', verifyCertificate);

// Protected routes
router.use(authenticateToken);
router.get('/portfolio', getPortfolio);
router.get('/certificates', getCertificates);
router.get('/gamification/stats', getGamificationStats);

export default router;
