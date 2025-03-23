const express = require('express');
const { body, param, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Session = require('../models/session');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /sessions - Create a new session (login)
router.post(
  '/',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
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
      // Find user
      const user = await User.findOne({ email: req.body.email });
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Verify password
      const isPasswordValid = await user.comparePassword(req.body.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Generate JWT token
      const tokenExpiry = process.env.JWT_EXPIRES_IN || '7d';
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'default_secret_key_change_in_production',
        { expiresIn: tokenExpiry }
      );
      
      // Calculate expiry date
      const expiresIn = tokenExpiry.match(/(\d+)([dh])/);
      let expiresAt = new Date();
      
      if (expiresIn) {
        const value = parseInt(expiresIn[1]);
        const unit = expiresIn[2];
        
        if (unit === 'd') {
          expiresAt.setDate(expiresAt.getDate() + value);
        } else if (unit === 'h') {
          expiresAt.setHours(expiresAt.getHours() + value);
        }
      } else {
        // Default: 7 days
        expiresAt.setDate(expiresAt.getDate() + 7);
      }
      
      // Create session
      const session = new Session({
        userId: user._id,
        token,
        expiresAt,
      });
      
      await session.save();
      
      // Return session info
      res.status(201).json({
        id: session._id,
        userId: user._id,
        token,
        expiresAt,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// DELETE /sessions - End current session (logout)
router.delete(
  '/',
  [auth],
  async (req, res) => {
    try {
      // Find and delete current session
      await Session.findByIdAndDelete(req.session._id);
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// DELETE /sessions/:id - Delete session (logout specific session)
router.delete(
  '/:id',
  [
    auth,
    param('id').isMongoId().withMessage('Valid session ID is required'),
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
      // Find session
      const session = await Session.findById(req.params.id);
      
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
      
      // Check if user owns the session
      if (session.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to delete this session' });
      }
      
      // Delete session
      await Session.findByIdAndDelete(req.params.id);
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;