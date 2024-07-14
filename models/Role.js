const mongoose = require('mongoose');

// Define role schema
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true   // Ensures each role name is unique
  }
});

// Create Role model based on roleSchema
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
