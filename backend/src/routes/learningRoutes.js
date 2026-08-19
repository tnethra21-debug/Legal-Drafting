// backend/src/routes/learningRoutes.js
import express from 'express';
import {
  getLearningPath,
  getLessons,
  getLessonById,
  completeLesson,
  getQuizQuestions,
  submitQuiz
} from '../controllers/learningController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/path', getLearningPath);
router.get('/lessons', getLessons);
router.get('/lessons/:id', getLessonById);
router.post('/lessons/:id/complete', completeLesson);
router.get('/quiz/gate', getQuizQuestions);
router.post('/quiz/gate/submit', submitQuiz);

export default router;
