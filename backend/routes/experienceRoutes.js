import express from 'express';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getExperiences);
router.post('/', protect, adminOnly, createExperience);
router.put('/:id', protect, adminOnly, updateExperience);
router.delete('/:id', protect, adminOnly, deleteExperience);

export default router;
