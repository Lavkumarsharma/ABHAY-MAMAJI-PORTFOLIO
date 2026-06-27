import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String, default: '' },
  techStack: [{ type: String }],
  image: { type: String, default: '' },
  gallery: [{ type: String }],
  githubLink: { type: String, default: '' },
  liveLink: { type: String, default: '' },
  features: [{ type: String }],
  outcomes: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
