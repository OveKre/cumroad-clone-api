/**
 * Authentication Middleware
 */

// Import dependencies
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/auth');
const { HTTP_STATUS, ERROR_CODES } = require('../../utils/errorCodes');
const BlacklistedToken = require('../models/blacklistedToken');

/**
 * Middleware to verify JWT token
 */
const authenticate = async (req, res, next) => {
  // Get authorization header
  const authHeader = req.headers.authorization;

  // Check if authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json(ERROR_CODES.AUTHENTICATION_REQUIRED);
  }

  // Extract token from authorization header
  const token = authHeader.split(' ')[1];

  try {
    // Check if token is blacklisted
    const blacklistedToken = await BlacklistedToken.findOne({ where: { token } });
    if (blacklistedToken) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json(ERROR_CODES.INVALID_CREDENTIALS);
    }

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
