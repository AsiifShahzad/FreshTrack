// tasks/expiryChecker.js

const cron = require('node-cron');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { checkExpiryAndSendEmails } = require('../utils/mailer');

dotenv.config();

// Connect to DB if not already connected
if (mongoose.connection.readyState === 0) {
  const connectDB = require('../config/db');
  connectDB();
}

// Run every 3 minutes
cron.schedule('*/1 * * * *', async () => {
  console.log('Running expiry check every 3 minutes...');
  await checkExpiryAndSendEmails();
});
