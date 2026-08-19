// backend/server.js
import express from 'express';
import cors from 'cors';
import { config } from './src/config/index.js';
import authRoutes from './src/routes/authRoutes.js';
import diagnosticRoutes from './src/routes/diagnosticRoutes.js';
import learningRoutes from './src/routes/learningRoutes.js';
import scenarioRoutes from './src/routes/scenarioRoutes.js';
import draftingRoutes from './src/routes/draftingRoutes.js';
import assessmentRoutes from './src/routes/assessmentRoutes.js';
import portfolioRoutes from './src/routes/portfolioRoutes.js';

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logger for development
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'LegalDraft Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Mount Modular API Routes
app.use('/api/auth', authRoutes);
app.use('/api/diagnostic', diagnosticRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/scenarios', scenarioRoutes);
app.use('/api/drafting', draftingRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api', portfolioRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Start Server
app.listen(config.port, () => {
  console.log(`
=====================================================
  ⚖️  LegalDraft Learning Platform API Server  ⚖️
  Status:  Running on http://localhost:${config.port}
  Health:  http://localhost:${config.port}/api/health
  Node:    ${process.version}
=====================================================
  `);
});

export default app;
