const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

router.get('/admin-data', authMiddleware, isAdmin, (req, res) => {
  res.json({ message: 'This is protected admin data.' });
});

module.exports = router;
