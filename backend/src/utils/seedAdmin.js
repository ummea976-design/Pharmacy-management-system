const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    // Check if admin exists
    const adminExists = await User.findOne({ email: 'admin@pharmacy.com' });

    if (adminExists) {
      console.log('Admin user already exists');
      await mongoose.connection.close();
      return;
    }

    // Create admin user
    const admin = await User.create({
      email: 'admin@pharmacy.com',
      password: 'password123',
      name: 'Admin User',
      role: 'ADMIN',
      isActive: true
    });

    console.log('Admin user created successfully:', {
      email: admin.email,
      name: admin.name,
      role: admin.role
    });

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding admin:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedAdmin();
}

module.exports = seedAdmin;

