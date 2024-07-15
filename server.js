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
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware for enabling CORS

// Define Routes
app.use('/api/auth', authRoutes); // Route for authentication
app.use('/api/ous', ouRoutes); // Route for organizational units (OUs)
app.use('/api/divisions', divisionRoutes); // Route for divisions
app.use('/api/credentials', credentialRoutes); // Route for credentials
app.use('/api/users', userRoutes); // Route for users
app.use('/api/roles', roleRoutes); // Route for roles

// Protected Route Example: Get authenticated user details
app.get('/api/user', authMiddleware, (req, res) => {
  res.json(req.user); // Return authenticated user details
});

// Get all roles (Unprotected route)
app.get('/api/roles', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Get all credentials (Unprotected route)
app.get('/api/credentials', async (req, res) => {
  try {
    const credentials = await Credential.find().populate('division', 'name'); // Populate division details
    res.json(credentials);
  } catch (error) {
    console.error('Error fetching credentials:', error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Get all divisions (Unprotected route)
app.get('/api/divisions', async (req, res) => {
  try {
    const divisions = await Division.find().populate('ou', 'name'); // Populate OU details
    res.json(divisions);
  } catch (error) {
    console.error('Error fetching divisions:', error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
