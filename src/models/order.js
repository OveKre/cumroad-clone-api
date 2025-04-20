/**
 * Order Model
 */

// Import dependencies
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./product');

// Define Order model
const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending',
  },
}, {
  // Model options
  timestamps: true,
});

// Define associations
Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

Order.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Order, { foreignKey: 'productId' });

module.exports = Order;
