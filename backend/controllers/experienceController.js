import asyncHandler from 'express-async-handler';
import Experience from '../models/Experience.js';
import { invalidateBootstrapCache } from '../utils/cache.js';

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
export const getExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find().sort({ order: 1 });
  res.json(experiences);
});

// @desc    Create an experience
// @route   POST /api/experiences
// @access  Private/Admin
export const createExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.create(req.body);
  invalidateBootstrapCache();
  res.status(201).json(experience);
});

// @desc    Update an experience
// @route   PUT /api/experiences/:id
// @access  Private/Admin
export const updateExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (experience) {
    invalidateBootstrapCache();
    res.json(experience);
  } else {
    res.status(404);
    throw new Error('Experience not found');
  }
});

// @desc    Delete an experience
// @route   DELETE /api/experiences/:id
// @access  Private/Admin
export const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByIdAndDelete(req.params.id);
  if (experience) {
    invalidateBootstrapCache();
    res.json({ message: 'Experience removed' });
  } else {
    res.status(404);
    throw new Error('Experience not found');
  }
});
