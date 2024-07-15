const express = require('express');
const router = express.Router();
const cors = require('cors'); // Import cors package
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const roleController = require('../controllers/roleController');
const userController = require('../controllers/userController');

// Use CORS middleware for all routes (replace '*' with your frontend URL in production)
router.use(cors());

// Route to create a new role (Protected route)
router.post('/', authMiddleware, adminMiddleware, roleController.createRole);

// Route to get all roles
router.get('/', roleController.getAllRoles);

// Route to update a role by ID (Protected route)
router.put('/:id', authMiddleware, adminMiddleware, roleController.updateRole);

// Route to update user roles (Protected route, requires admin privileges)
router.put('/user/:userId/roles', authMiddleware, adminMiddleware, userController.updateUserRoles);

// Route to delete a role by ID (Protected route)
router.delete('/:id', authMiddleware, adminMiddleware, roleController.deleteRole);

module.exports = router;
