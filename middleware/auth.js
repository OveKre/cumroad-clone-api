/**
 * Authentication Middleware
 */

// Import dependencies
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/auth');
const { HTTP_STATUS, ERROR_CODES } = require('../utils/errorCodes');

/**
 * Middleware to verify JWT token
 */
const authenticate = (req, res, next) => {
  // Get authorization header
  const authHeader = req.headers.authorization;

  // Check if authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json(ERROR_CODES.AUTHENTICATION_REQUIRED);
  }

  // Extract token from authorization header
  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    
    // Add user data to request
    req.user = decoded;
    
    // Continue to next middleware
    next();
  } catch (error) {
    // Handle invalid token
    return res.status(HTTP_STATUS.UNAUTHORIZED).json(ERROR_CODES.INVALID_CREDENTIALS);
  }
};

module.exports = authenticate;
