// controllers/credentialController.js
const Credential = require('../models/Credential');

// Get all credentials
exports.getCredentials = async (req, res) => {
  try {
    const credentials = await Credential.find().populate('division', 'name');
    res.json(credentials);
  } catch (err) {
    console.error('Error fetching credentials:', err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new credential
exports.createCredential = async (req, res) => {
  const { title, username, password, division } = req.body;
  try {
    const newCredential = new Credential({ title, username, password, division });
    await newCredential.save();
    res.status(201).json(newCredential);
  } catch (err) {
    console.error('Error creating credential:', err.message);
    res.status(500).send('Server Error');
  }
};

// Update a credential by ID
exports.updateCredential = async (req, res) => {
  const { id } = req.params;
  const { title, username, password, division } = req.body;
  try {
    const updatedCredential = await Credential.findByIdAndUpdate(
      id,
      { title, username, password, division },
      { new: true }
    );
    if (!updatedCredential) {
      return res.status(404).json({ message: 'Credential not found' });
    }
    res.json(updatedCredential);
  } catch (err) {
    console.error('Error updating credential:', err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a credential by ID
exports.deleteCredential = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCredential = await Credential.findByIdAndDelete(id);
    if (!deletedCredential) {
      return res.status(404).json({ message: 'Credential not found' });
    }
    res.json({ message: 'Credential deleted successfully' });
  } catch (err) {
    console.error('Error deleting credential:', err.message);
    res.status(500).send('Server Error');
  }
};
