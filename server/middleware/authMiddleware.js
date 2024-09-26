const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect Route Middleware
exports.protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header contains a Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Extract the token from "Bearer <token>"
  }

  // If no token is provided, return an unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    // Verify the token and decode the user's ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user and attach the user data to the request object, excluding the password
    req.user = await User.findById(decoded.id).select('-password');

    // Call the next middleware or controller
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please log in again' });
    }
    return res.status(401).json({ message: 'Not authorized, token verification failed' });
  }
};
