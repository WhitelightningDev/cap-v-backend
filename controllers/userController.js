// controllers/userController.js
const User = require('../models/User');

// Example controller methods
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }
    // Create new user
    user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Implement other user-related controllers like login, updateRole, etc.
