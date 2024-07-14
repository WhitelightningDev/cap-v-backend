const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

// Middleware to verify JWT token from header
module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user; // Set decoded user payload on request object
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Middleware to restrict access to Admin role
module.exports.admin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
};

// Middleware to restrict access to Manager and Admin roles
module.exports.manager = (req, res, next) => {
  if (req.user.role !== 'Manager' && req.user.role !== 'Admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
};

// Middleware to restrict access to Normal, Manager, and Admin roles
module.exports.normal = (req, res, next) => {
  if (req.user.role !== 'Normal' && req.user.role !== 'Manager' && req.user.role !== 'Admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
};
