const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const Product = require('../models/product');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /products - Get all products
router.get(
  '/',
  [
    query('userId').optional().isMongoId().withMessage('Valid user ID is required'),
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
        query.userId = req.query.userId;
      }

      const products = await Product.find(query);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// POST /products - Create a new product
router.post(
  '/',
  [
    auth,
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
    body('fileUrl').notEmpty().withMessage('File URL is required'),
    body('description').optional(),
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
      // Create product
      const product = new Product({
        ...req.body,
        userId: req.user._id,
      });
      
      await product.save();

      // Set location header and return product
      res.status(201)
        .location(`/products/${product._id}`)
        .json(product);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// GET /products/:id - Get product by ID
router.get(
  '/:id',
  [
    param('id').isMongoId().withMessage('Valid product ID is required'),
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
      const product = await Product.findById(req.params.id);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// PATCH /products/:id - Update product
router.patch(
  '/:id',
  [
    auth,
    param('id').isMongoId().withMessage('Valid product ID is required'),
    body('name').optional(),
    body('description').optional(),
    body('price').optional().isFloat({ min: 0 }).withMessage('Valid price is required'),
    body('fileUrl').optional(),
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
      // Find product
      const product = await Product.findById(req.params.id);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      // Check ownership
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to update this product' });
      }

      // Update allowed fields
      const allowedUpdates = ['name', 'description', 'price', 'fileUrl'];
      const updates = {};
      
      Object.keys(req.body).forEach(key => {
        if (allowedUpdates.includes(key)) {
          updates[key] = req.body[key];
        }
      });

      // Apply updates
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
      );

      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// DELETE /products/:id - Delete product
router.delete(
  '/:id',
  [
    auth,
    param('id').isMongoId().withMessage('Valid product ID is required'),
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
      // Find product
      const product = await Product.findById(req.params.id);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      // Check ownership
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to delete this product' });
      }

      // Delete product
      await Product.findByIdAndDelete(req.params.id);
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;