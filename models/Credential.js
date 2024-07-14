const mongoose = require('mongoose');

// Define Credential schema
const CredentialSchema = new mongoose.Schema({
  title: { type: String, required: true },         // Title of the credential (e.g., application name)
  username: { type: String, required: true },      // Username associated with the credential
  password: { type: String, required: true },      // Password associated with the credential
  division: {                                      // Reference to Division schema for organizational structure
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Division',
    required: true
  }
});

// Export Credential model based on CredentialSchema
module.exports = mongoose.model('Credential', CredentialSchema);
