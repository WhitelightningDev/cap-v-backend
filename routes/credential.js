const express = require('express');
const router = express.Router();
const credentialController = require('../controllers/credentialController');

// Get all credentials
router.get('/', credentialController.getCredentials);

// Get a single credential by ID
router.get('/:id', credentialController.getCredentialById);

// Create a new credential
router.post('/', credentialController.createCredential);

// Update a credential by ID
router.put('/:id', credentialController.updateCredential);

// Delete a credential by ID
router.delete('/:id', credentialController.deleteCredential);

module.exports = router;
