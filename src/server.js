const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
require('dotenv').config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/gumroad-clone';
console.log('MongoDB URI:', mongoUri);

// Connect to MongoDB
mongoose.set('strictQuery', false); // Suppress deprecation warning
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');

    // Import routes
    const usersRoutes = require('./routes/users');
    const productsRoutes = require('./routes/products');
    const ordersRoutes = require('./routes/orders');
    const sessionsRoutes = require('./routes/sessions');

    // Routes
    app.use('/users', usersRoutes);
    app.use('/products', productsRoutes);
    app.use('/orders', ordersRoutes);
    app.use('/sessions', sessionsRoutes);

    // Load Swagger documents
    try {
      // Load English and Estonian Swagger documents
      const swaggerDocumentEN = YAML.load(path.join(__dirname, '../swagger-en.yaml'));
      const swaggerDocumentET = YAML.load(path.join(__dirname, '../swagger-et.yaml'));
      
      // Setup English Swagger UI at '/en' endpoint
      app.use('/en', swaggerUi.serve, swaggerUi.setup(swaggerDocumentEN, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'Gumroad Clone API Documentation',
        swaggerOptions: {
          docExpansion: 'list',
          filter: true,
          showCommonExtensions: true
        }
      }));
      
      // Setup Estonian Swagger UI at '/et' endpoint
      app.use('/et', swaggerUi.serve, swaggerUi.setup(swaggerDocumentET, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'Gumroad Clone API Dokumentatsioon',
        swaggerOptions: {
          docExpansion: 'list',
          filter: true,
          showCommonExtensions: true
        }
      }));
      
      // Setup the legacy API docs path
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentEN, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'Gumroad Clone API Documentation',
        swaggerOptions: {
          docExpansion: 'list',
          filter: true,
          showCommonExtensions: true
        }
      }));
      
      // Handle the root endpoint - redirect based on browser language
      app.get('/', (req, res) => {
        const acceptLanguage = req.headers['accept-language'] || '';
        const preferredLanguage = acceptLanguage.includes('et') ? 'et' : 'en';
        res.redirect(`/${preferredLanguage}`);
      });
      
      console.log('Swagger UI is set up');
      console.log('Documentation available at:');
      console.log('- English: https://docs.digikaup.online/en');
      console.log('- Estonian: https://docs.digikaup.online/et');
      console.log('- Legacy: https://digikaup.online/api-docs');
    } catch (error) {
      console.error('Error setting up Swagger UI:', error);
    }

    // 404 handler
    app.use((req, res, next) => {
      res.status(404).json({
        message: 'Not found'
      });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({
        message: 'Something went wrong!'
      });
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

module.exports = app;