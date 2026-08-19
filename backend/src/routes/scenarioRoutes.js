// backend/src/routes/scenarioRoutes.js
import express from 'express';
import { getAvailableDomains, getScenariosByDomain, getScenarioById } from '../controllers/scenarioController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/domains', getAvailableDomains);
router.get('/domains/:domain/scenarios', getScenariosByDomain);
router.get('/scenarios/:id', getScenarioById);

export default router;
