const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

// Fetch all users
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password from the response
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Update user role
router.post('/change-role', authMiddleware, async (req, res) => {
  const { userId, role } = req.body;

  // Only allow Admins to change roles
  if (req.user.role !== 'Admin' && req.user._id.toString() !== userId) {
    return res.status(403).json({ msg: 'You are not authorized to change roles.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.role = role;
    await user.save();
    res.json({ msg: 'User role updated successfully' });
  } catch (error) {
    console.error('Error updating user role:', error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
