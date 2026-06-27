import express from 'express';
import { getCertifications, createCertification, updateCertification, deleteCertification } from '../controllers/certificationController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCertifications);
router.post('/', protect, adminOnly, createCertification);
router.put('/:id', protect, adminOnly, updateCertification);
router.delete('/:id', protect, adminOnly, deleteCertification);

export default router;
