const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

// Middleware to verify JWT token from header and authenticate user
const authMiddleware = async (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify and decode JWT token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Fetch user from database based on decoded user ID, excluding password field
    const user = await User.findById(decoded.user.id).select('-password');

    // Check if user exists
    if (!user) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }

    // Set authenticated user object on request object
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = authMiddleware;
