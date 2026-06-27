import asyncHandler from 'express-async-handler';
import Blog from '../models/Blog.js';
import { invalidateBootstrapCache } from '../utils/cache.js';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public (Filters published) or Private/Admin (Gets all)
export const getBlogs = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.admin !== 'true') {
    filter.status = 'published';
  }
  const blogs = await Blog.find(filter).sort({ order: 1, createdAt: -1 });
  res.json(blogs);
});

// @desc    Get blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.create(req.body);
  invalidateBootstrapCache();
  res.status(201).json(blog);
});

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (blog) {
    invalidateBootstrapCache();
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (blog) {
    invalidateBootstrapCache();
    res.json({ message: 'Blog post removed' });
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});
