/**
 * User Controller
 */
// Import dependencies
const User = require('../models/user');
const { HTTP_STATUS, ERROR_CODES } = require('../../utils/errorCodes');
const { validateUserRegistration } = require('../../utils/validation');
/**
 * Get all users
 */
const getAllUsers = async (req, res, next) => {
  try {
    // Get all users (toJSON method will exclude password)
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
/**
 * Get user by ID
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Get user by ID (toJSON method will exclude password)
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json(ERROR_CODES.RESOURCE_NOT_FOUND);
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
/**
 * Create a new user
 */
const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    // Validate user data
    const validationError = validateUserRegistration(userData);
    if (validationError) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(validationError);
    }
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) {
      return res.status(HTTP_STATUS.CONFLICT).json(ERROR_CODES.EMAIL_IN_USE);
    }
    // Create user
    const user = await User.create(userData);
    
    // Explicitly use the user.toJSON() method to exclude password
    const userWithoutPassword = user.toJSON();
    
    // Return user data without password
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};
/**
 * Update user
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    // Check if user exists
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json(ERROR_CODES.RESOURCE_NOT_FOUND);
    }
    // Check if user is authorized to update this user
    if (req.user.id !== parseInt(id) && req.user.role !== 'admin') {
      return res.status(HTTP_STATUS.FORBIDDEN).json(ERROR_CODES.UNAUTHORIZED);
    }
    // Update user
    await user.update(userData);
    
    // Explicitly use toJSON method to exclude password
    const updatedUserWithoutPassword = user.toJSON();
    
    // Return user data without password
    return res.status(200).json(updatedUserWithoutPassword);
  } catch (error) {
    next(error);
  }
};
/**
 * Delete user
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Check if user exists
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json(ERROR_CODES.RESOURCE_NOT_FOUND);
    }
    // Check if user is authorized to delete this user
    if (req.user.id !== parseInt(id) && req.user.role !== 'admin') {
      return res.status(HTTP_STATUS.FORBIDDEN).json(ERROR_CODES.UNAUTHORIZED);
    }
    // Delete user
    await user.destroy();
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
