const jwt = require('jsonwebtoken');
const config = require('../config/config');
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
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Add user from payload
    req.user = decoded;

    // Check if token is about to expire (e.g., within 30 seconds)
    const nowInSeconds = Math.floor(Date.now() / 1000);
    if (decoded.exp - nowInSeconds < 30) {
      // Token is about to expire, consider refreshing it
      const refreshedToken = jwt.sign({ id: decoded.id }, config.JWT_SECRET, { expiresIn: '1h' });
      res.setHeader('x-auth-token', refreshedToken);
    }

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
    if (err.name === 'TokenExpiredError') {
      // Handle expired token error (optional)
      return res.status(401).json({ msg: 'Token has expired' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = authMiddleware;
