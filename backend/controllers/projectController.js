import asyncHandler from 'express-async-handler';
import Project from '../models/Project.js';
import { invalidateBootstrapCache } from '../utils/cache.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.featured === 'true') {
    filter.isFeatured = true;
  }
  if (req.query.category) {
    filter.category = req.query.category;
  }
  const projects = await Project.find(filter).sort({ order: 1 });
  res.json(projects);
});

// @desc    Get single project by slug
// @route   GET /api/projects/:slug
// @access  Public
export const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  invalidateBootstrapCache();
  res.status(201).json(project);
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (project) {
    invalidateBootstrapCache();
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (project) {
    invalidateBootstrapCache();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});
