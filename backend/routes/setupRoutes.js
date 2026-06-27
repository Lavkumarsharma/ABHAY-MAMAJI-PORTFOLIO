import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Setting from '../models/Setting.js';
import Experience from '../models/Experience.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Education from '../models/Education.js';
import Certification from '../models/Certification.js';
import { resumeData } from '../seedData.js';

const router = express.Router();

router.post('/init', asyncHandler(async (req, res) => {
  const adminExists = await User.findOne({ role: 'admin' });
  if (adminExists) {
    res.status(400);
    throw new Error('Admin user already exists. Initialization has already been run.');
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@email.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

  const user = await User.create({
    fullName: 'Abhay Kumar Upadhyay',
    email: adminEmail,
    password: adminPassword,
    role: 'admin'
  });

  // Seed Settings
  let settings = await Setting.findOne();
  if (!settings) {
    settings = await Setting.create(resumeData.settings);
  }

  // Seed Experiences
  const experienceCount = await Experience.countDocuments();
  if (experienceCount === 0) {
    await Experience.insertMany(resumeData.experiences);
  }

  // Seed Projects
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany(resumeData.projects);
  }

  // Seed Skills
  const skillCount = await Skill.countDocuments();
  if (skillCount === 0) {
    await Skill.insertMany(resumeData.skills);
  }

  // Seed Education
  const educationCount = await Education.countDocuments();
  if (educationCount === 0) {
    await Education.insertMany(resumeData.education);
  }

  // Seed Certifications
  const certificationCount = await Certification.countDocuments();
  if (certificationCount === 0) {
    await Certification.insertMany(resumeData.certifications);
  }

  res.status(201).json({
    message: 'First-time setup initialized successfully. Admin user created and resume data seeded.',
    admin: {
      fullName: user.fullName,
      email: user.email
    }
  });
}));

export default router;
