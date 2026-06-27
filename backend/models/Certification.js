import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  issuedDate: { type: String, required: true },
  expiryDate: { type: String, default: '' },
  credentialId: { type: String, default: '' },
  credentialUrl: { type: String, default: '' },
  image: { type: String, default: '' },
  skills: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Certification', certificationSchema);
