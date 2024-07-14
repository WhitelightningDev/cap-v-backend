// middleware/adminMiddleware.js
const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming req.user is set by authMiddleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.role !== 'Admin') {
      return res.status(403).json({ msg: 'Access denied: Admins only' });
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = adminMiddleware;
