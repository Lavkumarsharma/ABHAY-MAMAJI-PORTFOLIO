import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, default: '' },
  startDate: { type: String, required: true },
  endDate: { type: String, default: '' },
  isCurrent: { type: Boolean, default: false },
  description: { type: String, default: '' },
  responsibilities: [{ type: String }],
  achievements: [{ type: String }],
  techStack: [{ type: String }],
  companyLogo: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Experience', experienceSchema);
