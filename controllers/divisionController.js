const Division = require('../models/Division');

// Create a new division
exports.createDivision = async (req, res) => {
  const { name, ou } = req.body;
  try {
    const division = new Division({ name, ou });
    await division.save();
    res.json(division);
  } catch (err) {
    console.error('Error creating division:', err.message);
    res.status(500).send('Server Error');
  }
};

// Get all divisions
exports.getDivisions = async (req, res) => {
  try {
    const divisions = await Division.find().populate('ou');
    res.json(divisions);
  } catch (err) {
    console.error('Error fetching divisions:', err.message);
    res.status(500).send('Server Error');
  }
};

// Update a division by ID
exports.updateDivision = async (req, res) => {
  const { id } = req.params;
  const { name, ou } = req.body;
  try {
    const updatedDivision = await Division.findByIdAndUpdate(
      id,
      { name, ou },
      { new: true }
    );
    if (!updatedDivision) {
      return res.status(404).json({ message: 'Division not found' });
    }
    res.json(updatedDivision);
  } catch (err) {
    console.error('Error updating division:', err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a division by ID
exports.deleteDivision = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDivision = await Division.findByIdAndDelete(id);
    if (!deletedDivision) {
      return res.status(404).json({ message: 'Division not found' });
    }
    res.json({ message: 'Division deleted successfully' });
  } catch (err) {
    console.error('Error deleting division:', err.message);
    res.status(500).send('Server Error');
  }
};
