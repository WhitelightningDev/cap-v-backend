const jwt = require('jsonwebtoken');
const config = require('config'); // You may use config package to manage configurations
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if token does not exist
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret')); // Replace with your actual secret

    // Add user from payload
    req.user = decoded;

    // Check if user exists and retrieve user details
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }

    // Set the user in request object for further use in routes
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = authMiddleware;
