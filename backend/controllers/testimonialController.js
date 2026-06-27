import asyncHandler from 'express-async-handler';
import Testimonial from '../models/Testimonial.js';
import { invalidateBootstrapCache } from '../utils/cache.js';

// @desc    Get testimonials
// @route   GET /api/testimonials
// @access  Public (gets active only) or Private/Admin (gets all)
export const getTestimonials = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.admin !== 'true') {
    filter.isActive = true;
  }
  const testimonials = await Testimonial.find(filter).sort({ order: 1 });
  res.json(testimonials);
});

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  invalidateBootstrapCache();
  res.status(201).json(testimonial);
});

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (testimonial) {
    invalidateBootstrapCache();
    res.json(testimonial);
  } else {
    res.status(404);
    throw new Error('Testimonial not found');
  }
});

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (testimonial) {
    invalidateBootstrapCache();
    res.json({ message: 'Testimonial removed' });
  } else {
    res.status(404);
    throw new Error('Testimonial not found');
  }
});
