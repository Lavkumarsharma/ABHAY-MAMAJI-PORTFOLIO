import asyncHandler from 'express-async-handler';
import Education from '../models/Education.js';
import { invalidateBootstrapCache } from '../utils/cache.js';

// @desc    Get all education
// @route   GET /api/education
// @access  Public
export const getEducation = asyncHandler(async (req, res) => {
  const education = await Education.find().sort({ order: 1 });
  res.json(education);
});

// @desc    Create education listing
// @route   POST /api/education
// @access  Private/Admin
export const createEducation = asyncHandler(async (req, res) => {
  const education = await Education.create(req.body);
  invalidateBootstrapCache();
  res.status(201).json(education);
});

// @desc    Update education listing
// @route   PUT /api/education/:id
// @access  Private/Admin
export const updateEducation = asyncHandler(async (req, res) => {
  const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (education) {
    invalidateBootstrapCache();
    res.json(education);
  } else {
    res.status(404);
    throw new Error('Education not found');
  }
});

// @desc    Delete education listing
// @route   DELETE /api/education/:id
// @access  Private/Admin
export const deleteEducation = asyncHandler(async (req, res) => {
  const education = await Education.findByIdAndDelete(req.params.id);
  if (education) {
    invalidateBootstrapCache();
    res.json({ message: 'Education removed' });
  } else {
    res.status(404);
    throw new Error('Education not found');
  }
});
