const express = require('express');
const router = express.Router();
const ouController = require('../controllers/ouController');

router.post('/', ouController.createOU);
router.get('/', ouController.getOUs);

module.exports = router;
