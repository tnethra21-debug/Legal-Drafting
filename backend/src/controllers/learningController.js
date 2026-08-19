// backend/src/controllers/learningController.js
import { db } from '../models/db.js';
import { ProgressionService } from '../services/progressionService.js';

export const getLearningPath = (req, res) => {
  try {
    const roadmap = ProgressionService.getUserRoadmap(req.user);
    return res.status(200).json({ success: true, roadmap });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getLessons = (req, res) => {
  try {
    const userProgress = db.lessonProgress.filter(lp => lp.userId === req.user.id);
    const completedLessonIds = new Set(userProgress.map(lp => lp.lessonId));

    const lessons = db.lessons.map((lesson, idx) => {
      const isCompleted = completedLessonIds.has(lesson.id);
      // Lesson 1 is always unlocked; subsequent lessons are unlocked if previous is completed
      const isUnlocked = idx === 0 || completedLessonIds.has(db.lessons[idx - 1].id);

      return {
        ...lesson,
        isCompleted,
        isUnlocked
      };
    });

    return res.status(200).json({
      success: true,
      lessons,
      totalCompleted: completedLessonIds.size,
      totalLessons: db.lessons.length
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getLessonById = (req, res) => {
  try {
    const { id } = req.params;
    const lesson = db.lessons.find(l => l.id === id);

    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found.' });
    }

    const progress = db.lessonProgress.find(lp => lp.userId === req.user.id && lp.lessonId === id);

    return res.status(200).json({
      success: true,
      lesson,
      isCompleted: !!progress
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const completeLesson = (req, res) => {
  try {
    const { id } = req.params;
    const lesson = db.lessons.find(l => l.id === id);

    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found.' });
    }

    const result = ProgressionService.completeLesson(req.user.id, id);

    return res.status(200).json({
      success: true,
      message: `Lesson ${lesson.order} completed!`,
      ...result
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getQuizQuestions = (req, res) => {
  try {
    // Check if user has completed lessons or can access quiz
    const questions = db.quizQuestions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options
    }));

    return res.status(200).json({
      success: true,
      quiz: {
        title: 'Drafting Basics Quiz Gate',
        totalQuestions: questions.length,
        passingScore: 70,
        timeLimitMinutes: 5,
        questions
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const submitQuiz = (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ success: false, message: 'Answers object is required.' });
    }

    const attempt = ProgressionService.processQuizSubmission(req.user.id, answers);

    return res.status(200).json({
      success: true,
      message: attempt.passed ? '🎉 Congratulations! Quiz passed!' : 'Keep practicing. Review lessons and retry.',
      result: attempt
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
