import express from 'express';
import { getEducation, createEducation, updateEducation, deleteEducation } from '../controllers/educationController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getEducation);
router.post('/', protect, adminOnly, createEducation);
router.put('/:id', protect, adminOnly, updateEducation);
router.delete('/:id', protect, adminOnly, deleteEducation);

export default router;
