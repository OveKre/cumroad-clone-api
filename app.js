/**
 * CumRoad Clone API - Express Application Setup
 */

// Import dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const fs = require('fs');

// Import routes
const userRoutes = require('./src/routes/users');
const productRoutes = require('./src/routes/products');
const orderRoutes = require('./src/routes/orders');
const sessionRoutes = require('./src/routes/sessions');

// Import middleware
const errorHandler = require('./src/middleware/errorHandler');

// Import database
const db = require('./src/config/database');

// Import models
require('./src/models/user');
require('./src/models/product');
require('./src/models/order');
require('./src/models/blacklistedToken');

// Import token cleanup utility
const { cleanupExpiredTokens } = require('./utils/tokenCleanup');

// Initialize Express app
const app = express();

// Test database connection
db.authenticate()
  .then(() => console.log('Database connection established'))
  .catch(err => console.error('Database connection error:', err));

// Sync database models
db.sync()
  .then(() => {
    console.log('Database synced');

    // Set up periodic cleanup of expired tokens (every hour)
    setInterval(async () => {
      try {
        const count = await cleanupExpiredTokens();
        console.log(`Scheduled cleanup: removed ${count} expired tokens`);
      } catch (error) {
        console.error('Error in scheduled token cleanup:', error);
      }
    }, 60 * 60 * 1000); // 1 hour

    // Initial cleanup on startup
    cleanupExpiredTokens()
      .then(count => console.log(`Initial cleanup: removed ${count} expired tokens`))
      .catch(error => console.error('Error in initial token cleanup:', error));
  })
  .catch(err => console.error('Database sync error:', err));

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Load Swagger documentation
console.log('Loading Swagger files from:', __dirname);
const swaggerEnPath = path.join(__dirname, 'swagger-en.yaml');
const swaggerEtPath = path.join(__dirname, 'swagger-et.yaml');

let swaggerEn;
let swaggerEt;

// Check if files exist
if (!fs.existsSync(swaggerEnPath)) {
  console.error('WARNING: English Swagger file not found at', swaggerEnPath);
} else {
  swaggerEn = YAML.load(swaggerEnPath);
  console.log('Loaded English Swagger:', swaggerEn.info.title);
}

if (!fs.existsSync(swaggerEtPath)) {
  console.error('WARNING: Estonian Swagger file not found at', swaggerEtPath);
} else {
  swaggerEt = YAML.load(swaggerEtPath);
  console.log('Loaded Estonian Swagger:', swaggerEt.info.title);
}

// Configuration options for Swagger UI
const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    defaultModelsExpandDepth: -1,
    docExpansion: 'list'
  }
};

// English options
const swaggerOptionsEn = {
  ...swaggerOptions,
  customSiteTitle: "CumRoad Clone API - English Documentation"
};

// Estonian options
const swaggerOptionsEt = {
  ...swaggerOptions,
  customSiteTitle: "CumRoad Clone API - Estonian Documentation"
};

// Setup English routes (default) - both /api-docs and /en should show English
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', (req, res, next) => {
  console.log('Serving English documentation at /api-docs');
  swaggerUi.setup(swaggerEn, swaggerOptionsEn)(req, res, next);
});

app.use('/en', swaggerUi.serve);
app.get('/en', (req, res, next) => {
  console.log('Serving English documentation at /en');
  swaggerUi.setup(swaggerEn, swaggerOptionsEn)(req, res, next);
});

// Setup Estonian route - only /et should show Estonian
app.use('/et', swaggerUi.serve);
app.get('/et', (req, res, next) => {
  console.log('Serving Estonian documentation at /et');
  swaggerUi.setup(swaggerEt, swaggerOptionsEt)(req, res, next);
});

// Root route
app.get('/', (req, res) => {
  console.log('Redirecting from / to /api-docs');
  res.redirect('/api-docs');
});

// API routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/sessions', sessionRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;