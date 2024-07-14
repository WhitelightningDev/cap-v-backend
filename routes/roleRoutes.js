const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const roleController = require('../controllers/roleController');

// Route to create a new role (Protected route)
router.post('/', authMiddleware, adminMiddleware, roleController.createRole);

// Route to get all roles
router.get('/', roleController.getAllRoles);

module.exports = router;