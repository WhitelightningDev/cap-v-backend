const mongoose = require('mongoose');

// Define user schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true   // Ensures each username is unique
  },
  password: {
    type: String,
    required: true   // Password is required
  },
  role: {
    type: String,
    enum: ['Admin', 'Manager', 'Normal', 'user'], // User roles with 'user' added
    default: 'Normal'  // Default role is 'Normal'
  },
  date: {
    type: Date,
    default: Date.now   // Default date is the current date/time
  },
  division: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Division',
    required: true
  },
});

// Create User model based on UserSchema
const User = mongoose.model('User', UserSchema);

module.exports = User;
