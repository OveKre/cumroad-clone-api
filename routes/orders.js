/**
 * Order Routes
 */

// Import dependencies
const express = require('express');
const orderController = require('../controllers/orderController');
const authenticate = require('../middleware/auth');

// Create router
const router = express.Router();

// All order routes require authentication
router.use(authenticate);

// GET /orders - Get all orders
router.get('/', orderController.getAllOrders);

// GET /orders/:id - Get order by ID
router.get('/:id', orderController.getOrderById);

// POST /orders - Create a new order
router.post('/', orderController.createOrder);

// PATCH /orders/:id - Update order
router.patch('/:id', orderController.updateOrder);

// DELETE /orders/:id - Delete order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
