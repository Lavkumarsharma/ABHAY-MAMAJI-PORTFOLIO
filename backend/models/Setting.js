import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  title: { type: String, required: true },
  tagline: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  resumeLink: { type: String, default: '' },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  twitter: { type: String, default: '' },
  instagram: { type: String, default: '' },
  website: { type: String, default: '' },
  hero: {
    headingLine1: { type: String, default: '' },
    headingLine2: { type: String, default: '' },
    headingLine3: { type: String, default: '' },
    subheading: { type: String, default: '' },
    primaryButtonText: { type: String, default: '' },
    primaryButtonLink: { type: String, default: '' },
    secondaryButtonText: { type: String, default: '' },
    secondaryButtonLink: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    heroImages: [{ type: String }]
  },
  navbar: {
    logoText: { type: String, default: '' },
    logoAccent: { type: String, default: '' },
    links: [{ name: String, path: String }],
    ctaText: { type: String, default: '' },
    ctaPath: { type: String, default: '' }
  },
  about: {
    heading: { type: String, default: '' },
    subheading: { type: String, default: '' },
    bio: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    yearsOfExperience: { type: String, default: '0' },
    projectsCompleted: { type: String, default: '0' },
    technologiesMastered: { type: String, default: '0' },
    openToWork: { type: Boolean, default: false }
  },
  footer: {
    tagline: { type: String, default: '' },
    quickLinks: [{ name: String, path: String }],
    copyrightText: { type: String, default: '' }
  },
  theme: {
    primaryColor: { type: String, default: '' },
    accentColor: { type: String, default: '' },
    backgroundColor: { type: String, default: '' },
    fontFamily: { type: String, default: 'Inter' }
  }
}, { timestamps: true });

export default mongoose.model('Setting', settingSchema);
