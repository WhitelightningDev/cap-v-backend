const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const ouRoutes = require('./routes/ou');
const divisionRoutes = require('./routes/division');
const credentialRoutes = require('./routes/credential');
const authMiddleware = require('./middleware/auth');

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
  res.send('Authenticated User');
});

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
