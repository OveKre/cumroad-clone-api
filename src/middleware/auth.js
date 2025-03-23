const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Session = require('../models/session');

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user and check if session exists
    const user = await User.findById(decoded.userId);
    const session = await Session.findOne({ 
      userId: decoded.userId, 
      token, 
      expiresAt: { $gt: new Date() } 
    });
    
    if (!user || !session) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Attach user to request object
    req.user = user;
    req.token = token;
    req.session = session;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication required' });
  }
};

module.exports = auth;