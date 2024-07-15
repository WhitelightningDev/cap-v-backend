const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const roleController = require('../controllers/roleController');

// Route to create a new role (Protected route)
router.post('/', authMiddleware, adminMiddleware, roleController.createRole);

// Route to get all roles
router.get('/', roleController.getAllRoles);


// Route to update a role by ID (Protected route)
router.put('/:id', authMiddleware, adminMiddleware, roleController.updateRole);

// Route to delete a role by ID (Protected route)
router.delete('/:id', authMiddleware, adminMiddleware, roleController.deleteRole);

module.exports = router;
