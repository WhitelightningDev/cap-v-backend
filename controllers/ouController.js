const OU = require('../models/OU');

// Create a new OU
exports.createOU = async (req, res) => {
  const { name } = req.body;
  try {
    // Create a new OU object with the provided name
    const ou = new OU({ name });
    await ou.save(); // Save the new OU to the database
    res.json(ou); // Send the newly created OU as JSON response
  } catch (err) {
    console.error('Error creating OU:', err.message); // Log any errors that occur
    res.status(500).send('Server Error'); // Send a 500 server error response
  }
};

// Get all OUs
exports.getOUs = async (req, res) => {
  try {
    // Fetch all OUs from the database
    const ous = await OU.find();
    res.json(ous); // Send the fetched OUs as JSON response
  } catch (err) {
    console.error('Error fetching OUs:', err.message); // Log any errors that occur
    res.status(500).send('Server Error'); // Send a 500 server error response
  }
};

// Update an OU by ID
exports.updateOU = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    // Find the OU by ID and update its name with the provided data, returning the updated document
    const updatedOU = await OU.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedOU) {
      return res.status(404).json({ message: 'OU not found' }); // If OU not found, return a 404 response
    }
    res.json(updatedOU); // Send the updated OU as JSON response
  } catch (err) {
    console.error('Error updating OU:', err.message); // Log any errors that occur
    res.status(500).send('Server Error'); // Send a 500 server error response
  }
};

// Delete an OU by ID
exports.deleteOU = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the OU by ID and delete it from the database
    const deletedOU = await OU.findByIdAndDelete(id);
    if (!deletedOU) {
      return res.status(404).json({ message: 'OU not found' }); // If OU not found, return a 404 response
    }
    res.json({ message: 'OU deleted successfully' }); // Send a success message as JSON response
  } catch (err) {
    console.error('Error deleting OU:', err.message); // Log any errors that occur
    res.status(500).send('Server Error'); // Send a 500 server error response
  }
};
