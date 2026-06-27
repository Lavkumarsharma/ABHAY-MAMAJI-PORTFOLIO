import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  ip: { type: String, default: '' },
  userAgent: { type: String, default: '' },
  location: { type: String, default: '' },
  page: { type: String, default: '/' },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Visitor', visitorSchema);
