/**
 * Session Controller
 */
// Import dependencies
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/auth');
const { HTTP_STATUS, ERROR_CODES } = require('../../utils/errorCodes');
const { validateUserLogin } = require('../../utils/validation');
const BlacklistedToken = require('../models/blacklistedToken');
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
    // Find user by email - unscoped to include password for comparison
    const user = await User.unscoped().findOne({ where: { email } });
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

    // Explicitly use toJSON to exclude password
    const userWithoutPassword = user.toJSON();

    // Return user data without password
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
    // Get the token from the authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    // Get token expiration time from decoded token
    const decoded = jwt.verify(token, jwtSecret);
    const expiresAt = new Date(decoded.exp * 1000); // Convert to milliseconds

    // Add token to blacklist
    await BlacklistedToken.create({
      token,
      expiresAt,
    });

    // Client should also remove the token from storage
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  login,
  logout,
};
