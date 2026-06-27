import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio-abhay';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected for admin seeding');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@email.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

    const userExists = await User.findOne({ email: adminEmail });

    if (userExists) {
      console.log(`Admin user with email ${adminEmail} already exists. Skipping creation.`);
    } else {
      await User.create({
        fullName: 'Abhay Kumar Upadhyay',
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log(`Admin user created successfully: email = ${adminEmail}`);
    }

    await mongoose.connection.close();
    console.log('Admin seeding completed');
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
