/**
 * Authentication Configuration
 */

// Import dependencies
require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'your_default_jwt_secret_key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
};
