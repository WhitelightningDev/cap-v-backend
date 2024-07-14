const Division = require('../models/Division');

// Create a new division
exports.createDivision = async (req, res) => {
  const { name, ou } = req.body;
  try {
    // Create a new Division object with the provided data
    const division = new Division({ name, ou });
    await division.save(); // Save the new division to the database
    res.json(division); // Send the newly created division as JSON response
  } catch (err) {
    console.error('Error creating division:', err.message); // Log any errors that occur
    res.status(500).send('Server Error'); // Send a 500 server error response
  }
};

// Get all divisions
exports.getDivisions = async (req, res) => {
  try {
    // Fetch all divisions and populate the 'ou' field with its data from the OU model
    const divisions = await Division.find().populate('ou');
    res.json(divisions); // Send the fetched divisions as JSON response
  } catch (err) {
    console.error('Error fetching divisions:', err.message); // Log any errors that occur
    res.status(500).send('Server Error'); // Send a 500 server error response
  }
};

// Update a division by ID
exports.updateDivision = async (req, res) => {
  const { id } = req.params;
  const { name, ou } = req.body;
  try {
    // Find the division by ID and update it with the provided data, returning the updated document
    const updatedDivision = await Division.findByIdAndUpdate(
      id,
      { name, ou },
      { new: true } // Ensure the updated document is returned
    );
    if (!updatedDivision) {
      return res.status(404).json({ message: 'Division not found' }); // If division not found, return a 404 response
    }
    res.json(updatedDivision); // Send the updated division as JSON response
  } catch (err) {
    console.error('Error updating division:', err.message); // Log any errors that occur
    res.status(500).send('Server Error'); // Send a 500 server error response
  }
};

// Delete a division by ID
exports.deleteDivision = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the division by ID and delete it from the database
    const deletedDivision = await Division.findByIdAndDelete(id);
    if (!deletedDivision) {
      return res.status(404).json({ message: 'Division not found' }); // If division not found, return a 404 response
    }
    res.json({ message: 'Division deleted successfully' }); // Send a success message as JSON response
  } catch (err) {
    console.error('Error deleting division:', err.message); // Log any errors that occur
    res.status(500).send('Server Error'); // Send a 500 server error response
  }
};
