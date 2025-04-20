/**
 * Database Configuration
 */

// Import dependencies
const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Get database path from environment variables or use default
const dbPath = process.env.DB_PATH || path.join(__dirname, '..', 'database.sqlite');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

module.exports = sequelize;
