const Credential = require('../models/Credential');

// Get all credentials
exports.getCredentials = async (req, res) => {
  try {
    // Fetch all credentials and populate the 'division' and 'ou' fields with their 'name' from the Division and OU models
    const credentials = await Credential.find().populate('division', 'name').populate('ou', 'name');
    res.json(credentials); // Send the fetched credentials as JSON response
  } catch (err) {
    console.error('Error fetching credentials:', err.message); // Log any errors that occur
    res.status(500).send('Server Error'); // Send a 500 server error response
  }
};

// Get a single credential by ID
exports.getCredentialById = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the credential by ID and populate the 'division' and 'ou' fields with their 'name' from the Division and OU models
    const credential = await Credential.findById(id).populate('division', 'name').populate('ou', 'name');
    if (!credential) {
      return res.status(404).json({ message: 'Credential not found' }); // If credential not found, return a 404 response
    }
    res.json(credential); // Send the fetched credential as JSON response
  } catch (err) {
    console.error('Error fetching credential:', err.message); // Log any errors that occur
    res.status(500).send('Server Error'); // Send a 500 server error response
  }
};

// Create a new credential
exports.createCredential = async (req, res) => {
  const { title, username, password, division, ou } = req.body;
  try {
    // Create a new Credential object with the provided data
    const newCredential = new Credential({ title, username, password, division, ou });
    await newCredential.save(); // Save the new credential to the database
    res.status(201).json(newCredential); // Send the newly created credential as JSON response with status 201 (Created)
  } catch (err) {
    console.error('Error creating credential:', err.message); // Log any errors that occur
    res.status(500).send('Server Error'); // Send a 500 server error response
  }
};

// Update a credential by ID
exports.updateCredential = async (req, res) => {
  const { id } = req.params;
  const { title, username, password, division, ou } = req.body;
  try {
    // Find the credential by ID and update it with the provided data, returning the updated document
    const updatedCredential = await Credential.findByIdAndUpdate(
      id,
      { title, username, password, division, ou },
      { new: true } // Ensure the updated document is returned
    );
    if (!updatedCredential) {
      return res.status(404).json({ message: 'Credential not found' }); // If credential not found, return a 404 response
    }
    res.json(updatedCredential); // Send the updated credential as JSON response
  } catch (err) {
    console.error('Error updating credential:', err.message); // Log any errors that occur
    res.status(500).send('Server Error'); // Send a 500 server error response
  }
};

// Delete a credential by ID
exports.deleteCredential = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the credential by ID and delete it from the database
    const deletedCredential = await Credential.findByIdAndDelete(id);
    if (!deletedCredential) {
      return res.status(404).json({ message: 'Credential not found' }); // If credential not found, return a 404 response
    }
    res.json({ message: 'Credential deleted successfully' }); // Send a success message as JSON response
  } catch (err) {
    console.error('Error deleting credential:', err.message); // Log any errors that occur
    res.status(500).send('Server Error'); // Send a 500 server error response
  }
};
