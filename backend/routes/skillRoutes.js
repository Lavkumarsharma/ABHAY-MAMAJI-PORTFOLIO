import express from 'express';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getSkills);
router.post('/', protect, adminOnly, createSkill);
router.put('/:id', protect, adminOnly, updateSkill);
router.delete('/:id', protect, adminOnly, deleteSkill);

export default router;
