const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect Route Middleware
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('Token found:', token);  // Log the token for debugging
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);  // Log the decoded token

    req.user = await User.findById(decoded.id).select('-password');
    console.log('User found:', req.user);  // Log the user details

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next(); // Move to the next middleware or controller
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please log in again' });
    }
    console.error('Error verifying token:', error);  // Log token verification error
    return res.status(401).json({ message: 'Not authorized, token verification failed' });
  }
};
