/**
 * Error Handler Middleware
 */

// Import error codes
const { HTTP_STATUS, ERROR_CODES } = require('../utils/errorCodes');

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Check if this is a known error with a code
  if (err.code) {
    const statusCode = err.statusCode || HTTP_STATUS.BAD_REQUEST;
    return res.status(statusCode).json({
      code: err.code,
      error: err.error,
      message: err.message,
      field: err.field,
    });
  }

  // Handle Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(e => ({
      field: e.path,
      message: e.message,
    }));
    
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      code: ERROR_CODES.REQUIRED_FIELD.code,
      error: 'VALIDATION_ERROR',
      message: 'Validation failed',
      errors,
    });
  }

  // Handle Sequelize unique constraint errors
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors[0].path;
    
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      code: ERROR_CODES.EMAIL_IN_USE.code,
      error: 'UNIQUE_CONSTRAINT_ERROR',
      message: `${field} already exists`,
      field,
    });
  }

  // Default to internal server error
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    code: ERROR_CODES.SERVER_ERROR.code,
    error: ERROR_CODES.SERVER_ERROR.error,
    message: ERROR_CODES.SERVER_ERROR.message,
  });
};

module.exports = errorHandler;
