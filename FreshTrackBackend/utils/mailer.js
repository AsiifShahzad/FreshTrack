// utils/mailer.js
require('dotenv').config();
const nodemailer = require('nodemailer');
const Product    = require('../models/Product');
const User       = require('../models/User');

// 1) Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // your app password
  },
});

// (Optional) Verify SMTP connection
transporter.verify((err, success) => {
  if (err) console.error('SMTP Error:', err);
  else     console.log('SMTP ready');
});

// 2) Function to send a single email
async function sendExpiryEmail(to, productName, expiryDate) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: `${productName} expires on ${expiryDate.toDateString()}`,
      text: `Heads up! Your product "${productName}" will expire on ${expiryDate.toDateString()}.`,
    });
    console.log(`Email sent to ${to}`);
  } catch (e) {
    console.error(`Failed to send to ${to}:`, e);
  }
}

// 3) Function to find soon-to-expire products & email users
async function checkExpiryAndSendEmails() {
  const now = new Date();
  const cutoff = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

  try {
    const products = await Product.find({
      expiryDate: { $gte: now, $lte: cutoff }
    });

    for (let p of products) {
      const user = await User.findById(p.userId);
      if (user && user.email) {
        await sendExpiryEmail(user.email, p.name, p.expiryDate);
      }
    }
  } catch (e) {
    console.error('Expiry-check error:', e);
  }
}

// 4) Self-scheduling every minute
setInterval(checkExpiryAndSendEmails, 60 * 1000); // 60 000 ms = 1 min
console.log('Expiry checker scheduled every 1 minute');

module.exports = {
  transporter,
  sendExpiryEmail,
  checkExpiryAndSendEmails,
};
