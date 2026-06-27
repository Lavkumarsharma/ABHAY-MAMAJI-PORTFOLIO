import express from 'express';
import { getBootstrapData, getSettings, updateSettings } from '../controllers/settingController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/bootstrap', getBootstrapData);
router.get('/', getSettings);
router.put('/', protect, adminOnly, updateSettings);

export default router;
