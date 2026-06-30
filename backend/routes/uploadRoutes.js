import express from 'express';
import multer from 'multer';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Store file in memory buffer — no disk, no Cloudinary needed
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

/**
 * Convert uploaded file buffer → Base64 data URL
 * Stored directly in MongoDB as a string — works everywhere, no external service needed
 */
const handleUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const mimeType = req.file.mimetype;
  const base64 = req.file.buffer.toString('base64');
  const dataUrl = `data:${mimeType};base64,${base64}`;

  return res.status(200).json({
    url: dataUrl,
    source: 'mongodb-base64',
  });
};

// Image upload (profile photos, project covers, etc.)
router.post('/image', protect, adminOnly, upload.single('image'), handleUpload);

// Resume PDF upload
router.post('/resume', protect, adminOnly, upload.single('resume'), handleUpload);

export default router;
