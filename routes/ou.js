const express = require('express');
const router = express.Router();
const ouController = require('../controllers/ouController');

// POST /api/ous - Create a new organizational unit (OU)
router.post('/', ouController.createOU);

// GET /api/ous - Fetch all organizational units (OUs)
router.get('/', ouController.getOUs);

// PUT /api/ous/:id - Update an organizational unit (OU) by ID
router.put('/:id', ouController.updateOU);

// DELETE /api/ous/:id - Delete an organizational unit (OU) by ID
router.delete('/:id', ouController.deleteOU);

module.exports = router;
