/**
 * User Routes
 */

// Import dependencies
const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middleware/auth');

// Create router
const router = express.Router();

// GET /users - Get all users
router.get('/', userController.getAllUsers);

// GET /users/:id - Get user by ID
router.get('/:id', userController.getUserById);

// POST /users - Create a new user
router.post('/', userController.createUser);

// PATCH /users/:id - Update user
router.patch('/:id', authenticate, userController.updateUser);

// DELETE /users/:id - Delete user
router.delete('/:id', authenticate, userController.deleteUser);

module.exports = router;
