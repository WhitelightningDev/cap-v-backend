const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const ouRoutes = require('./routes/ou');
const divisionRoutes = require('./routes/division');
const credentialRoutes = require('./routes/credential');
const userRoutes = require('./routes/user'); // Updated user routes import
const roleRoutes = require('./routes/roleRoutes'); // Updated role routes import
const authMiddleware = require('./middleware/authMiddleware');
const User = require('./models/User');
const Credential = require('./models/Credential');
const Division = require('./models/Division');
const config = require('./config/config'); // Added config import for JWT secret

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
app.use('/api/users', userRoutes); 
app.use('/api/roles', roleRoutes); 

// Protected Route Example
app.get('/api/user', authMiddleware, (req, res) => {
  res.json(req.user); // Return authenticated user details
});

// Get all users (Admin only)
app.get('/api/users', authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Get all credentials (Unprotected route)
app.get('/api/credentials', async (req, res) => {
  try {
    const credentials = await Credential.find().populate('division', 'name');
    res.json(credentials);
  } catch (error) {
    console.error('Error fetching credentials:', error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Get all divisions (Unprotected route )
app.get('/api/divisions', async (req, res) => {
  try {
    const divisions = await Division.find().populate('ou', 'name');
    res.json(divisions);
  } catch (error) {
    console.error('Error fetching divisions:', error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
