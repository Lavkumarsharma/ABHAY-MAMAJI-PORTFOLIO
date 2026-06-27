import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { uploadToCloudinary, isCloudinaryConfigured } from '../utils/cloudinary.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const handleUpload = async (req, res, folder) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  const fileName = `${Date.now()}_${req.file.originalname.replace(/\s+/g, '_')}`;

  // Try Cloudinary
  if (isCloudinaryConfigured) {
    try {
      const result = await uploadToCloudinary(req.file.buffer, folder, req.file.originalname);
      return res.status(200).json({
        url: result.secure_url,
        public_id: result.public_id,
        source: 'cloudinary'
      });
    } catch (error) {
      console.error('Cloudinary upload failed, using local disk fallback:', error.message);
    }
  }

  // Fallback to local public disk storage
  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, req.file.buffer);

    const hostUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const localUrl = `${hostUrl}/uploads/${fileName}`;

    return res.status(200).json({
      url: localUrl,
      source: 'local'
    });
  } catch (error) {
    res.status(500);
    throw new Error(`Upload failed: ${error.message}`);
  }
};

router.post('/image', protect, adminOnly, upload.single('image'), (req, res, next) => {
  handleUpload(req, res, 'images').catch(next);
});

router.post('/resume', protect, adminOnly, upload.single('resume'), (req, res, next) => {
  handleUpload(req, res, 'resumes').catch(next);
});

export default router;
