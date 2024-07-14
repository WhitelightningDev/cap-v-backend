const mongoose = require('mongoose');

// Define OU schema
const OUSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true   // Ensures each OU name is unique
  }
});

// Export OU model based on OUSchema
module.exports = mongoose.model('OU', OUSchema);
