import express from 'express';
import { submitMessage, getMessages, markMessageAsRead, deleteMessage } from '../controllers/messageController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', submitMessage);
router.get('/', protect, adminOnly, getMessages);
router.put('/:id/read', protect, adminOnly, markMessageAsRead);
router.delete('/:id', protect, adminOnly, deleteMessage);

export default router;
