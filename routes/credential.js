const express = require('express');
const router = express.Router();
const Credential = require('../models/Credential'); // Import Credential model
const authMiddleware = require('../middleware/authMiddleware');
const cors = require('cors'); // Import CORS middleware

// Apply CORS middleware
router.use(cors());

// Fetch all credentials (Unprotected)
router.get('/', async (req, res) => {
  try {
    const credentials = await Credential.find().populate('division', 'name');
    res.json(credentials);
  } catch (error) {
    console.error('Error fetching credentials:', error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Add new credential (Protected route)
router.post('/', authMiddleware, async (req, res) => {
  const { title, username, password, division } = req.body;

  try {
    const newCredential = new Credential({
      title,
      username,
      password,
      division,
    });

    await newCredential.save();

    res.status(201).json(newCredential);
  } catch (error) {
    console.error('Error adding credential:', error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
