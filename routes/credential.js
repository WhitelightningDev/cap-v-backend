const express = require('express');
const router = express.Router();
const credentialController = require('../controllers/credentialController');

router.post('/', credentialController.createCredential);
router.get('/', credentialController.getCredentials);

module.exports = router;
