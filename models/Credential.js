const mongoose = require('mongoose');

// Define Credential schema
const CredentialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  division: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Division',
    required: true
  },
  ou: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OU',
    required: true
  }
});

module.exports = mongoose.model('Credential', CredentialSchema);
