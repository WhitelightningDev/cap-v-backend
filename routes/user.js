const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const userController = require('../controllers/userController');

// Register a new user
router.post('/', userController.registerUser);

// Login a user
router.post('/login', userController.loginUser);

// Fetch all users (Admin only)
router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers);

// Fetch a single user by ID
router.get('/:userId', authMiddleware, userController.getUserById);

// Update user role by user ID (Admin only)
router.put('/:userId/update-role', authMiddleware, adminMiddleware, userController.updateUserRole);

// Delete a user by ID (Admin only)
router.delete('/:userId/delete', authMiddleware, adminMiddleware, userController.deleteUser);

// Assign user to division by user ID (Admin only)
router.put('/:userId/assign', authMiddleware, adminMiddleware, userController.assignUserToDivision);

// Unassign user from division by user ID (Admin only)
router.put('/:userId/unassign', authMiddleware, adminMiddleware, userController.unassignUserFromDivision);

module.exports = router;
