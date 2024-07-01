const express = require('express');
const router = express.Router();
const divisionController = require('../controllers/divisionController');

router.post('/', divisionController.createDivision);
router.get('/', divisionController.getDivisions);

module.exports = router;
