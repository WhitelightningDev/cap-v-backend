const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware'); // Middleware to ensure the user is an admin
const userController = require('../controllers/userController');

// Register a new user
router.post('/', userController.registerUser);


// Login a user
router.post('/login', userController.loginUser);

// Fetch all users (Admin only)
router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers);

// Fetch a single user by ID
router.get('/:userId', authMiddleware, userController.getUserById);

// Update user role (Admin only)
router.put('/update-role', authMiddleware, adminMiddleware, userController.updateUserRole);

// Delete a user (Admin only)
router.delete('/delete', authMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;
