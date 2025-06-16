const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const user = new User(req.body);
  const saved = await user.save();
  res.json(saved);
});

router.post('/login', async (req, res) => {
  const user = await User.findOne(req.body);
  if (user) res.json(user);
  else res.status(400).json({ message: 'Invalid credentials' });
});

module.exports = router;