import asyncHandler from 'express-async-handler';
import Skill from '../models/Skill.js';
import { invalidateBootstrapCache } from '../utils/cache.js';

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
export const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ order: 1 });
  res.json(skills);
});

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private/Admin
export const createSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create(req.body);
  invalidateBootstrapCache();
  res.status(201).json(skill);
});

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private/Admin
export const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (skill) {
    invalidateBootstrapCache();
    res.json(skill);
  } else {
    res.status(404);
    throw new Error('Skill not found');
  }
});

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private/Admin
export const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (skill) {
    invalidateBootstrapCache();
    res.json({ message: 'Skill removed' });
  } else {
    res.status(404);
    throw new Error('Skill not found');
  }
});
