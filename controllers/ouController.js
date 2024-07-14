const OU = require('../models/OU');

// Create a new OU
exports.createOU = async (req, res) => {
  const { name } = req.body;
  try {
    const ou = new OU({ name });
    await ou.save();
    res.json(ou);
  } catch (err) {
    console.error('Error creating OU:', err.message);
    res.status(500).send('Server Error');
  }
};

// Get all OUs
exports.getOUs = async (req, res) => {
  try {
    const ous = await OU.find();
    res.json(ous);
  } catch (err) {
    console.error('Error fetching OUs:', err.message);
    res.status(500).send('Server Error');
  }
};

// Update an OU by ID
exports.updateOU = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedOU = await OU.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedOU) {
      return res.status(404).json({ message: 'OU not found' });
    }
    res.json(updatedOU);
  } catch (err) {
    console.error('Error updating OU:', err.message);
    res.status(500).send('Server Error');
  }
};

// Delete an OU by ID
exports.deleteOU = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOU = await OU.findByIdAndDelete(id);
    if (!deletedOU) {
      return res.status(404).json({ message: 'OU not found' });
    }
    res.json({ message: 'OU deleted successfully' });
  } catch (err) {
    console.error('Error deleting OU:', err.message);
    res.status(500).send('Server Error');
  }
};
