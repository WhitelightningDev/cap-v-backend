const express = require('express');
const router = express.Router();
const ouController = require('../controllers/ouController');

// POST /api/ous - Create a new organizational unit (OU)
router.post('/', ouController.createOU);

// GET /api/ous - Fetch all organizational units (OUs)
router.get('/', ouController.getOUs);

module.exports = router;
