// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

async function seed() {
  await connectDB();

  // 1. Clear existing data
  await User.deleteMany({});
  await Product.deleteMany({});

  // 2. Create dummy users
  const password = await bcrypt.hash('password123', 10);
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@freshtrack.ai',
    password,
    role: 'admin',
  });
  const alice = await User.create({
    name: 'Alice',
    email: 'alice@freshtrack.ai',
    password,
    role: 'user',
  });

  console.log('✅ Users created:', [admin.email, alice.email]);

  // 3. Create dummy products for Alice
  const products = await Product.insertMany([
    {
      user: alice._id,
      name: 'Milk',
      category: 'Dairy',
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      imageUrl: '',
    },
    {
      user: alice._id,
      name: 'Bananas',
      category: 'Fruit',
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      imageUrl: '',
    },
  ]);

  console.log('✅ Products created:', products.map(p => p.name));

  process.exit();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
