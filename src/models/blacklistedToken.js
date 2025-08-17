/**
 * Blacklisted Token Model
 */

// Import dependencies
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define BlacklistedToken model
const BlacklistedToken = sequelize.define('BlacklistedToken', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  // Model options
  timestamps: true,
});

module.exports = BlacklistedToken;
