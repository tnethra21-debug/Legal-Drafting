// backend/src/routes/authRoutes.js
import express from 'express';
import { register, login, getMe, updateLanguage, getLanguages } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/languages', getLanguages);
router.get('/me', authenticateToken, getMe);
router.put('/me/language', authenticateToken, updateLanguage);

export default router;
