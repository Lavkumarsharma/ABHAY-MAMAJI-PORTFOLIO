import mongoose from 'mongoose';

let gfs;

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio-abhay';
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Initialize GridFS Bucket
    const db = conn.connection.db;
    gfs = new mongoose.mongo.GridFSBucket(db, {
      bucketName: 'uploads'
    });
    console.log('GridFS Bucket "uploads" initialized successfully');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export const getGridFSBucket = () => gfs;
