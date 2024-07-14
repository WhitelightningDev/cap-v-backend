const User = require('../models/User');

// Middleware function to check if the user is an admin
const adminMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming req.user is set by authMiddleware
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if user is an admin
    if (user.role !== 'Admin') {
      return res.status(403).json({ msg: 'Access denied: Admins only' });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Admin middleware error:', error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = adminMiddleware;
