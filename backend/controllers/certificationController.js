import asyncHandler from 'express-async-handler';
import Certification from '../models/Certification.js';
import { invalidateBootstrapCache } from '../utils/cache.js';

// @desc    Get all certifications
// @route   GET /api/certifications
// @access  Public
export const getCertifications = asyncHandler(async (req, res) => {
  const certifications = await Certification.find().sort({ order: 1 });
  res.json(certifications);
});

// @desc    Create a certification
// @route   POST /api/certifications
// @access  Private/Admin
export const createCertification = asyncHandler(async (req, res) => {
  const certification = await Certification.create(req.body);
  invalidateBootstrapCache();
  res.status(201).json(certification);
});

// @desc    Update a certification
// @route   PUT /api/certifications/:id
// @access  Private/Admin
export const updateCertification = asyncHandler(async (req, res) => {
  const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (certification) {
    invalidateBootstrapCache();
    res.json(certification);
  } else {
    res.status(404);
    throw new Error('Certification not found');
  }
});

// @desc    Delete a certification
// @route   DELETE /api/certifications/:id
// @access  Private/Admin
export const deleteCertification = asyncHandler(async (req, res) => {
  const certification = await Certification.findByIdAndDelete(req.params.id);
  if (certification) {
    invalidateBootstrapCache();
    res.json({ message: 'Certification removed' });
  } else {
    res.status(404);
    throw new Error('Certification not found');
  }
});
