const express = require('express');
const router = express.Router();
const divisionController = require('../controllers/divisionController');

// POST /api/divisions - Create a new division
router.post('/', divisionController.createDivision);

// GET /api/divisions - Fetch all divisions
router.get('/', divisionController.getDivisions);

module.exports = router;
