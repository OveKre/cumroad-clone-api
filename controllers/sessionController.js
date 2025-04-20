/**
 * Session Controller
 */

// Import dependencies
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/auth');
const { HTTP_STATUS, ERROR_CODES } = require('../utils/errorCodes');
const { validateUserLogin } = require('../utils/validation');

/**
 * Login user
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Validate login data
    const validationError = validateUserLogin({ email, password });
    if (validationError) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(validationError);
    }
    
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json(ERROR_CODES.INVALID_CREDENTIALS);
    }
    
    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json(ERROR_CODES.INVALID_CREDENTIALS);
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );
    
    // Return user data without password
    const { password: _, ...userWithoutPassword } = user.toJSON();
    
    return res.status(201).json({
      ...userWithoutPassword,
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout user
 */
const logout = async (req, res, next) => {
  try {
    // JWT is stateless, so we can't invalidate it on the server
    // The client should remove the token from storage
    
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
};
