const mongoose = require('mongoose');

// Define Division schema
const DivisionSchema = new mongoose.Schema({
  name: { type: String, required: true },         // Name of the division (e.g., IT, Finance)
  ou: {                                           // Reference to OU schema for organizational structure
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OU',
    required: true
  }
});

// Export Division model based on DivisionSchema
module.exports = mongoose.model('Division', DivisionSchema);
