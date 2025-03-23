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

// Kontrollime MongoDB ühenduse URL-i
const mongoUri = process.env.MONGODB_URI || 'mongodb://gumroad_admin:gumroad_secure_pass@localhost:27018/gumroad-clone?authSource=admin';
console.log('MongoDB URI:', mongoUri);

// Connect to MongoDB
mongoose.set('strictQuery', false); // Suppress deprecation warning
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');

    // Load Swagger documents
    try {
      const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
      const openApiDocument = YAML.load(path.join(__dirname, '../openapi.yaml'));
      
      // Setup Swagger UI
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
      console.log('Swagger UI is set up at /api-docs');
    } catch (error) {
      console.error('Error setting up Swagger UI:', error);
    }

    // Import routes only after DB connection is established
    const usersRoutes = require('./routes/users');
    const productsRoutes = require('./routes/products');
    const ordersRoutes = require('./routes/orders');
    const sessionsRoutes = require('./routes/sessions');

    // Routes
    app.use('/users', usersRoutes);
    app.use('/products', productsRoutes);
    app.use('/orders', ordersRoutes);
    app.use('/sessions', sessionsRoutes);

    // Base route
    app.get('/', (req, res) => {
      res.json({
        message: 'Gumroad Clone API',
        documentation: '/api-docs'
      });
    });

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
      console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

module.exports = app;