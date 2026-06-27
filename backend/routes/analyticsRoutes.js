import express from 'express';
import { getVisitorStats } from '../controllers/analyticsController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/visitors', protect, adminOnly, getVisitorStats);

export default router;
