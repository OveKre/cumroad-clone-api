const express = require('express');
const { body, param, validationResult } = require('express-validator');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /users - Create a new user
router.post(
  '/',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('name').notEmpty().withMessage('Name is required'),
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
      // Check if user already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ 
          message: 'Email already in use',
          field: 'email'
        });
      }

      // Create new user
      const user = new User(req.body);
      await user.save();

      // Set location header and return user
      res.status(201)
        .location(`/users/${user._id}`)
        .json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// GET /users/:id - Get user by ID
router.get(
  '/:id',
  [
    param('id').isMongoId().withMessage('Valid user ID is required'),
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
      const user = await User.findById(req.params.id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// PATCH /users/:id - Update user
router.patch(
  '/:id',
  [
    auth,
    param('id').isMongoId().withMessage('Valid user ID is required'),
    body('name').optional(),
    body('bio').optional(),
    body('password').optional().isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
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
      // Check if user exists and authorized
      const userId = req.params.id;
      if (userId !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to update this user' });
      }

      // Update allowed fields
      const allowedUpdates = ['name', 'bio', 'password'];
      const updates = {};
      
      Object.keys(req.body).forEach(key => {
        if (allowedUpdates.includes(key)) {
          updates[key] = req.body[key];
        }
      });

      // Apply updates
      const user = await User.findByIdAndUpdate(
        userId,
        updates,
        { new: true, runValidators: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// DELETE /users/:id - Delete user
router.delete(
  '/:id',
  [
    auth,
    param('id').isMongoId().withMessage('Valid user ID is required'),
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
      // Check if user exists and authorized
      const userId = req.params.id;
      if (userId !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to delete this user' });
      }

      // Delete user
      const user = await User.findByIdAndDelete(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;