const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports.admin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
};

module.exports.manager = (req, res, next) => {
  if (req.user.role !== 'Manager' && req.user.role !== 'Admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
};

module.exports.normal = (req, res, next) => {
  if (req.user.role !== 'Normal' && req.user.role !== 'Manager' && req.user.role !== 'Admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
};
