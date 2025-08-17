/**
 * Error Codes Utility
 */

// HTTP Status Codes
const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  REQUEST_TIMEOUT: 408,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

// Application Error Codes
const ERROR_CODES = {
  // Validation Errors (1000-1999)
  INVALID_EMAIL: {
    code: 1001,
    error: 'INVALID_EMAIL',
    message: 'The email format is invalid',
  },
  INVALID_PASSWORD: {
    code: 1002,
    error: 'INVALID_PASSWORD',
    message: 'Password must be at least 8 characters long',
    field: 'password',
  },
  EMAIL_IN_USE: {
    code: 1003,
    error: 'EMAIL_IN_USE',
    message: 'The email address is already registered',
  },
  REQUIRED_FIELD: {
    code: 1004,
    error: 'REQUIRED_FIELD',
    message: 'A required field is missing',
  },
  INVALID_ID: {
    code: 1005,
    error: 'INVALID_ID',
    message: 'The ID format is invalid',
  },

  // Authentication Errors (2000-2999)
  AUTHENTICATION_REQUIRED: {
    code: 2001,
    error: 'AUTHENTICATION_REQUIRED',
    message: 'Authentication is required to access this resource',
  },
  INVALID_CREDENTIALS: {
    code: 2002,
    error: 'INVALID_CREDENTIALS',
    message: 'The provided credentials are invalid',
  },
  UNAUTHORIZED: {
    code: 2003,
    error: 'UNAUTHORIZED',
    message: 'Not authorized to perform this action',
  },

  // Resource Errors (3000-3999)
  RESOURCE_NOT_FOUND: {
    code: 3001,
    error: 'RESOURCE_NOT_FOUND',
    message: 'The requested resource was not found',
  },

  // Server Errors (5000-5999)
  SERVER_ERROR: {
    code: 5001,
    error: 'SERVER_ERROR',
    message: 'An unexpected server error occurred',
  },
};

module.exports = {
  HTTP_STATUS,
  ERROR_CODES,
};
