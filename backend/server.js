import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { trackVisitor } from './middleware/trackVisitor.js';

// Route imports
import settingRoutes from './routes/settingRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import certificationRoutes from './routes/certificationRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import setupRoutes from './routes/setupRoutes.js';

// Cache imports
import { cache, cacheKeys } from './utils/cache.js';
import Setting from './models/Setting.js';
import Experience from './models/Experience.js';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Education from './models/Education.js';
import Certification from './models/Certification.js';
import Testimonial from './models/Testimonial.js';
import Blog from './models/Blog.js';

dotenv.config();

const app = express();

// ─── CORS ─────────────────────────────────────────────────────────────────────
// Allow all vercel.app domains + localhost in development
const allowedOrigins = [
  /\.vercel\.app$/,
  /^http:\/\/localhost(:\d+)?$/,
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, curl, Render health check)
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.some(pattern =>
      typeof pattern === 'string' ? pattern === origin : pattern.test(origin)
    );
    if (allowed) return callback(null, true);
    return callback(null, true); // Allow all for now — tighten after custom domain setup
  },
  credentials: true,
}));

// ─── Core Middlewares ──────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(compression());
app.use(morgan('dev'));

// ─── Health Check (MUST be before trackVisitor & routes) ──────────────────────
app.get('/', (req, res) => res.json({ status: 'ok', message: 'Portfolio API is running' }));
app.get('/health', (req, res) => res.json({ status: 'healthy', timestamp: new Date() }));
app.get('/api/health', (req, res) => res.json({ status: 'healthy', timestamp: new Date() }));

// ─── Visitor Tracking (only on non-health routes) ─────────────────────────────
app.use(trackVisitor);

// ─── Static Uploads ───────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/settings', settingRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/setup', setupRoutes);

// ─── Error Handlers ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  warmUpCache();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}).catch(err => {
  console.error('❌ DB Connection failed:', err.message);
  process.exit(1);
});

// ─── Cache Warmer ─────────────────────────────────────────────────────────────
async function warmUpCache() {
  try {
    console.log('Warming up bootstrap cache...');
    const [settings, experiences, projects, skills, education, certifications, testimonials, blogs] = await Promise.all([
      Setting.findOne(),
      Experience.find().sort({ order: 1 }),
      Project.find().sort({ order: 1 }),
      Skill.find().sort({ order: 1 }),
      Education.find().sort({ order: 1 }),
      Certification.find().sort({ order: 1 }),
      Testimonial.find({ isActive: true }).sort({ order: 1 }),
      Blog.find({ status: 'published' }).sort({ order: 1 })
    ]);

    cache.set(cacheKeys.BOOTSTRAP, {
      settings: settings || {},
      experiences: experiences || [],
      projects: projects || [],
      skills: skills || [],
      education: education || [],
      certifications: certifications || [],
      testimonials: testimonials || [],
      blogs: blogs || []
    });
    console.log('✅ Bootstrap cache warmed up successfully');
  } catch (error) {
    console.error('⚠️ Failed to warm up cache:', error.message);
  }
}
