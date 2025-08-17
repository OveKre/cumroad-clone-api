/**
 * Token Cleanup Utility
 */

// Import dependencies
const BlacklistedToken = require('../models/blacklistedToken');
const { Op } = require('sequelize');

/**
 * Clean up expired tokens from the blacklist
 */
const cleanupExpiredTokens = async () => {
  try {
    const now = new Date();
    
    // Delete tokens that have expired
    const result = await BlacklistedToken.destroy({
      where: {
        expiresAt: {
          [Op.lt]: now,
        },
      },
    });
    
    console.log(`Cleaned up ${result} expired tokens`);
    return result;
  } catch (error) {
    console.error('Error cleaning up expired tokens:', error);
    throw error;
  }
};

module.exports = {
  cleanupExpiredTokens,
};
