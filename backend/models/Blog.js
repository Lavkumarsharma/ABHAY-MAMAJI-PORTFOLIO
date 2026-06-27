import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, default: '' },
  content: { type: String, required: true },
  image: { type: String, default: '' },
  category: { type: String, default: '' },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  isFeatured: { type: Boolean, default: false },
  author: { type: String, default: '' },
  readTime: { type: String, default: '' },
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
