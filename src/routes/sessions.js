/**
 * Session Routes
 */

// Import dependencies
const express = require('express');
const sessionController = require('../controllers/sessionController');
const authenticate = require('../middleware/auth');

// Create router
const router = express.Router();

// POST /sessions - Login
router.post('/', sessionController.login);

// DELETE /sessions - Logout
router.delete('/', authenticate, sessionController.logout);

module.exports = router;
