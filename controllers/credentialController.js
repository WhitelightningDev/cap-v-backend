const Credential = require('../models/Credential');

exports.createCredential = async (req, res) => {
  const { title, username, password, division } = req.body;
  try {
    // Create a new credential instance
    let newCredential = new Credential({ title, username, password, division });

    // Save the credential to the database
    await newCredential.save();

    // Respond with the newly created credential
    res.status(201).json(newCredential);
  } catch (err) {
    console.error('Error creating credential:', err.message);
    res.status(500).send('Server Error');
  }
};

exports.getCredentials = async (req, res) => {
  try {
    // Fetch all credentials from the database and populate 'division' field
    const credentials = await Credential.find().populate('division', 'name');
    res.json(credentials);
  } catch (err) {
    console.error('Error fetching credentials:', err.message);
    res.status(500).send('Server Error');
  }
};
