const Credential = require('../models/Credential');

exports.createCredential = async (req, res) => {
  const { title, username, password, division } = req.body;
  try {
    let credential = new Credential({ title, username, password, division });
    await credential.save();
    res.json(credential);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getCredentials = async (req, res) => {
  try {
    const credentials = await Credential.find().populate('division');
    res.json(credentials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
