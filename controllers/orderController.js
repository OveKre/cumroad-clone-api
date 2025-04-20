/**
 * Order Controller
 */

// Import dependencies
const Order = require('../models/order');
const Product = require('../models/product');
const { HTTP_STATUS, ERROR_CODES } = require('../utils/errorCodes');
const { validateOrder } = require('../utils/validation');

/**
 * Get all orders
 */
const getAllOrders = async (req, res, next) => {
  try {
    // If user is admin, return all orders
    // Otherwise, return only user's orders
    const where = req.user.role === 'admin' ? {} : { userId: req.user.id };
    
    const orders = await Order.findAll({
      where,
      include: [{ model: Product }],
    });
    
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

/**
 * Get order by ID
 */
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findByPk(id, {
      include: [{ model: Product }],
    });
    
    if (!order) {
      return res.status(HTTP_STATUS.NOT_FOUND).json(ERROR_CODES.RESOURCE_NOT_FOUND);
    }
    
    // Check if user is authorized to view this order
    if (order.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(HTTP_STATUS.FORBIDDEN).json(ERROR_CODES.UNAUTHORIZED);
    }
    
    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new order
 */
const createOrder = async (req, res, next) => {
  try {
    const orderData = req.body;
    
    // Validate order data
    const validationError = validateOrder(orderData);
    if (validationError) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(validationError);
    }
    
    // Check if product exists
    const product = await Product.findByPk(orderData.productId);
    if (!product) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        ...ERROR_CODES.RESOURCE_NOT_FOUND,
        message: 'Product not found',
      });
    }
    
    // Add user ID from authenticated user
    orderData.userId = req.user.id;
    
    // Calculate total price
    orderData.totalPrice = product.price * orderData.quantity;
    
    // Create order
    const order = await Order.create(orderData);
    
    // Set Location header
    res.location(`/orders/${order.id}`);
    
    // Fetch order with product details
    const orderWithProduct = await Order.findByPk(order.id, {
      include: [{ model: Product }],
    });
    
    return res.status(201).json(orderWithProduct);
  } catch (error) {
    next(error);
  }
};

/**
 * Update order
 */
const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderData = req.body;
    
    // Validate order data
    const validationError = validateOrder(orderData, false);
    if (validationError) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(validationError);
    }
    
    // Check if order exists
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(HTTP_STATUS.NOT_FOUND).json(ERROR_CODES.RESOURCE_NOT_FOUND);
    }
    
    // Check if user is authorized to update this order
    if (order.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(HTTP_STATUS.FORBIDDEN).json(ERROR_CODES.UNAUTHORIZED);
    }
    
    // If quantity is changing, recalculate total price
    if (orderData.quantity) {
      const product = await Product.findByPk(order.productId);
      orderData.totalPrice = product.price * orderData.quantity;
    }
    
    // Update order
    await order.update(orderData);
    
    // Fetch updated order with product details
    const updatedOrder = await Order.findByPk(id, {
      include: [{ model: Product }],
    });
    
    return res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete order
 */
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if order exists
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(HTTP_STATUS.NOT_FOUND).json(ERROR_CODES.RESOURCE_NOT_FOUND);
    }
    
    // Check if user is authorized to delete this order
    if (order.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(HTTP_STATUS.FORBIDDEN).json(ERROR_CODES.UNAUTHORIZED);
    }
    
    // Delete order
    await order.destroy();
    
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
