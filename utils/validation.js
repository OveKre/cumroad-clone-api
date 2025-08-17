/**
 * Validation Utility
 */

// Import error codes
const { ERROR_CODES } = require('./errorCodes');

/**
 * Validates an email address
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password
 * @param {string} password - Password to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidPassword = (password) => {
  return password && password.length >= 8;
};

/**
 * Validates user input for registration
 * @param {Object} userData - User data to validate
 * @returns {Object|null} - Error object if invalid, null if valid
 */
const validateUserRegistration = (userData) => {
  if (!userData.email) {
    return { ...ERROR_CODES.REQUIRED_FIELD, field: 'email' };
  }

  if (!isValidEmail(userData.email)) {
    return { ...ERROR_CODES.INVALID_EMAIL, field: 'email' };
  }

  if (!userData.password) {
    return { ...ERROR_CODES.REQUIRED_FIELD, field: 'password' };
  }

  if (!isValidPassword(userData.password)) {
    return ERROR_CODES.INVALID_PASSWORD;
  }

  return null;
};

/**
 * Validates user input for login
 * @param {Object} userData - User data to validate
 * @returns {Object|null} - Error object if invalid, null if valid
 */
const validateUserLogin = (userData) => {
  if (!userData.email) {
    return { ...ERROR_CODES.REQUIRED_FIELD, field: 'email' };
  }

  if (!userData.password) {
    return { ...ERROR_CODES.REQUIRED_FIELD, field: 'password' };
  }

  return null;
};

/**
 * Validates product input
 * @param {Object} productData - Product data to validate
 * @param {boolean} isCreating - Whether this is for creating a new product
 * @returns {Object|null} - Error object if invalid, null if valid
 */
const validateProduct = (productData, isCreating = true) => {
  if (isCreating && !productData.name) {
    return { ...ERROR_CODES.REQUIRED_FIELD, field: 'name' };
  }

  if (isCreating && !productData.price) {
    return { ...ERROR_CODES.REQUIRED_FIELD, field: 'price' };
  }

  if (productData.price && isNaN(parseFloat(productData.price))) {
    return { error: 'INVALID_PRICE', message: 'Price must be a number', field: 'price', code: 1006 };
  }

  return null;
};

/**
 * Validates order input
 * @param {Object} orderData - Order data to validate
 * @param {boolean} isCreating - Whether this is for creating a new order
 * @returns {Object|null} - Error object if invalid, null if valid
 */
const validateOrder = (orderData, isCreating = true) => {
  if (isCreating && !orderData.productId) {
    return { ...ERROR_CODES.REQUIRED_FIELD, field: 'productId' };
  }

  if (isCreating && !orderData.quantity) {
    return { ...ERROR_CODES.REQUIRED_FIELD, field: 'quantity' };
  }

  if (orderData.quantity && (isNaN(parseInt(orderData.quantity)) || parseInt(orderData.quantity) <= 0)) {
    return { error: 'INVALID_QUANTITY', message: 'Quantity must be a positive number', field: 'quantity', code: 1007 };
  }

  return null;
};

module.exports = {
  isValidEmail,
  isValidPassword,
  validateUserRegistration,
  validateUserLogin,
  validateProduct,
  validateOrder,
};
