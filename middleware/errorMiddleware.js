// Middleware for handling errors
exports.errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
  
    // Handle MongoDB CastError
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid resource ID' });
    }
  
    // Handle duplicate key error (MongoDB)
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Duplicate field value entered' });
    }
  
    // Handle validation errors (Mongoose)
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ message: errors });
    }
  
    // Default server error
    res.status(500).json({ message: 'Server Error' });
  };
  