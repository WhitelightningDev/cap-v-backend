const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const ouRoutes = require('./routes/ou');
const divisionRoutes = require('./routes/division');
const credentialRoutes = require('./routes/credential');
const authMiddleware = require('./middleware/auth');
const User = require('./models/User');
const Credential = require('./models/Credential'); // Import Credential model

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/ous', ouRoutes);
app.use('/api/divisions', divisionRoutes);
app.use('/api/credentials', credentialRoutes);

// Protected Route Example
app.get('/api/user', authMiddleware, (req, res) => {
  res.json(req.user); // Return authenticated user details
});

// Get all credentials (Unprotected route example)
app.get('/api/credentials', async (req, res) => {
  try {
    const credentials = await Credential.find().populate('division', 'name'); // Assuming the division has a 'name' field
    res.json(credentials);
  } catch (error) {
    console.error('Error fetching credentials:', error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

app.get('/api/division', async (req,res) => {
  try {
    const division = await Division.find().populate('division',
      'name');
      res.json(division);
      } catch (error) {
        console.error('Error fetching division:', error.message);
        res.status(500).json({ msg: 'Server Error' });
      }
});

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
