const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

const superAdminOnly = (req, res, next) => {
  if (req.user.role !== 'super_admin') return res.status(403).json({ success: false, message: 'Forbidden' });
  next();
};

router.get('/farmers', auth, superAdminOnly, async (req, res) => {
  try {
    const farmers = await User.find({ role: { $ne: 'super_admin' } }).select('-passwordHash').sort({ username: 1 });
    res.json({ success: true, data: farmers });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/users', auth, superAdminOnly, async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;
    if (!username || !fullName || !email || !password)
      return res.status(400).json({ success: false, message: 'All fields are required' });
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(409).json({ success: false, message: 'Email already registered' });
    const user = new User({ username, fullName, email, passwordHash: password, role: 'farmer' });
    await user.save();
    res.status(201).json({ success: true, message: `Farmer account for ${fullName} created successfully` });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/users/:id/toggle', auth, superAdminOnly, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, role: { $ne: 'super_admin' } });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.isActive = !user.isActive;
    await user.save({ validateBeforeSave: false });
    res.json({ success: true, isActive: user.isActive, message: `Farmer ${user.isActive ? 'activated' : 'deactivated'} successfully` });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
