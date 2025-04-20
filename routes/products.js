/**
 * Product Routes
 */

// Import dependencies
const express = require('express');
const productController = require('../controllers/productController');
const authenticate = require('../middleware/auth');

// Create router
const router = express.Router();

// GET /products - Get all products
router.get('/', productController.getAllProducts);

// GET /products/:id - Get product by ID
router.get('/:id', productController.getProductById);

// POST /products - Create a new product
router.post('/', authenticate, productController.createProduct);

// PATCH /products/:id - Update product
router.patch('/:id', authenticate, productController.updateProduct);

// DELETE /products/:id - Delete product
router.delete('/:id', authenticate, productController.deleteProduct);

module.exports = router;
