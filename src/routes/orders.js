const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const Order = require('../models/order');
const Product = require('../models/product');
const auth = require('../middleware/auth');

// Router peab olema defineeritud enne selle kasutamist
const router = express.Router();

// GET /orders - Get all orders
router.get(
  '/',
  [
    query('userId').optional().isMongoId().withMessage('Valid user ID is required'),
    query('productId').optional().isMongoId().withMessage('Valid product ID is required'),
  ],
  async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation error', 
        field: errors.array()[0].param 
      });
    }

    try {
      // Build query
      const query = {};
      
      if (req.query.userId) {
        // Find products owned by the user
        const products = await Product.find({ userId: req.query.userId });
        const productIds = products.map(product => product._id);
        query.productId = { $in: productIds };
      }
      
      if (req.query.productId) {
        query.productId = req.query.productId;
      }

      // Fetch orders with populated product data
      const orders = await Order.find(query).populate('product');
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// POST /orders - Create a new order
router.post(
  '/',
  [
    body('productId').isMongoId().withMessage('Valid product ID is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('paymentMethod').isIn(['card', 'paypal']).withMessage('Valid payment method is required'),
    body('paymentDetails').optional().isObject().withMessage('Payment details must be an object'),
  ],
  async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation error', 
        field: errors.array()[0].param 
      });
    }

    try {
      // Check if product exists
      const product = await Product.findById(req.body.productId);
      if (!product) {
        return res.status(404).json({ 
          message: 'Product not found',
          field: 'productId'
        });
      }

      // Create order
      const order = new Order({
        productId: req.body.productId,
        email: req.body.email,
        status: 'pending',
        paymentMethod: req.body.paymentMethod,
        paymentDetails: req.body.paymentDetails,
      });
      
      // Process payment (mock for now)
      // In a real implementation, you would integrate with a payment provider like Stripe
      // and set download URL after payment is confirmed
      
      // For demo purposes, we'll immediately set status to completed
      // and create a download URL
      order.status = 'completed';
      order.downloadUrl = `/download/${product._id}`;
      
      await order.save();

      // Populate product information
      await order.populate('product');

      // Set location header and return order
      res.status(201)
        .location(`/orders/${order._id}`)
        .json(order);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// GET /orders/:id - Get order by ID
router.get(
  '/:id',
  [
    param('id').isMongoId().withMessage('Valid order ID is required'),
  ],
  async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation error', 
        field: 'id' 
      });
    }

    try {
      const order = await Order.findById(req.params.id).populate('product');
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// PATCH /orders/:id - Update order
router.patch(
  '/:id',
  [
    auth,
    param('id').isMongoId().withMessage('Valid order ID is required'),
    body('status').optional().isIn(['pending', 'processing', 'completed', 'failed']).withMessage('Valid status is required'),
    body('downloadUrl').optional(),
  ],
  async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation error', 
        field: errors.array()[0].param 
      });
    }

    try {
      // Find order
      const order = await Order.findById(req.params.id).populate('product');
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      // Check if user owns the product associated with this order
      if (order.product.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to update this order' });
      }

      // Update allowed fields
      const allowedUpdates = ['status', 'downloadUrl'];
      const updates = {};
      
      Object.keys(req.body).forEach(key => {
        if (allowedUpdates.includes(key)) {
          updates[key] = req.body[key];
        }
      });

      // Apply updates
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
      ).populate('product');

      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// DELETE /orders/:id - Delete order
router.delete(
  '/:id',
  [
    auth,
    param('id').isMongoId().withMessage('Valid order ID is required'),
  ],
  async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation error', 
        field: 'id' 
      });
    }

    try {
      // Find order
      const order = await Order.findById(req.params.id).populate('product');
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      // Check if user owns the product associated with this order
      if (order.product.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to delete this order' });
      }

      // Delete order
      await Order.findByIdAndDelete(req.params.id);
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;