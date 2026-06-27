import asyncHandler from 'express-async-handler';
import Setting from '../models/Setting.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Certification from '../models/Certification.js';
import Blog from '../models/Blog.js';
import Testimonial from '../models/Testimonial.js';
import { cache, cacheKeys, invalidateBootstrapCache } from '../utils/cache.js';

// @desc    Get bootstrap data (cached)
// @route   GET /api/settings/bootstrap
// @access  Public
export const getBootstrapData = asyncHandler(async (req, res) => {
  const cachedData = cache.get(cacheKeys.BOOTSTRAP);
  if (cachedData) {
    return res.json(cachedData);
  }

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

  const bootstrapData = {
    settings: settings || {},
    experiences: experiences || [],
    projects: projects || [],
    skills: skills || [],
    education: education || [],
    certifications: certifications || [],
    testimonials: testimonials || [],
    blogs: blogs || []
  };

  cache.set(cacheKeys.BOOTSTRAP, bootstrapData);
  res.json(bootstrapData);
});

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
export const getSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.findOne();
  if (settings) {
    res.json(settings);
  } else {
    res.status(404);
    throw new Error('Settings not found');
  }
});

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = asyncHandler(async (req, res) => {
  let settings = await Setting.findOne();

  if (settings) {
    settings = await Setting.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
  } else {
    settings = await Setting.create(req.body);
  }

  invalidateBootstrapCache();
  res.json(settings);
});
