/**
 * User Model
 */
// Import dependencies
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');
// Define User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
  },
}, {
  // Model options
  timestamps: true,
  hooks: {
    // Hash password before saving
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    // Hash password before updating
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
  // Add defaultScope to exclude password by default
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
});
/**
 * Compare password with hashed password
 * @param {string} password - Password to compare
 * @returns {Promise<boolean>} - True if password matches, false otherwise
 */
User.prototype.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};
/**
 * Override toJSON method to exclude password
 */
User.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};
module.exports = User;
