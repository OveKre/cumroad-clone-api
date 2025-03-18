// server.js
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Load your OpenAPI spec from the swagger.yaml file
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
const port = process.env.PORT || 3002;

// Middleware to parse JSON requests
app.use(express.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Authentication token is required' });
    }

    try {
        // In a real application, verify the JWT token here
        // For demo purposes, we're just checking if a token exists
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

// Swagger API Docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Redirect root to API documentation
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

/**
 * Products Endpoints
 */

// GET /products - List all products
app.get('/products', authenticateToken, (req, res) => {
    res.json(products);
});

// In-memory data store for demo purposes
let products = [];

// POST /products - Create a new product
app.post('/products', authenticateToken, (req, res) => {
    const { name, description, price } = req.body;
    if (!name || price === undefined) {
        return res.status(400).json({ error: 'Field validation failed: name and price are required fields.' });
    }
    const newProduct = {
        id: uuidv4(),
        name,
        description: description || '',
        price,
        url: `https://gumroadclone.example.com/products/${uuidv4()}`
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// GET /products/:productId - Get product details
app.get('/products/:productId', authenticateToken, (req, res) => {
    const { productId } = req.params;
    const product = products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json(product);
});

// PUT /products/:productId - Update an existing product
app.put('/products/:productId', authenticateToken, (req, res) => {
    const { productId } = req.params;
    const { name, description, price } = req.body;
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) return res.status(404).json({ error: 'Product not found.' });

    if (name !== undefined) products[productIndex].name = name;
    if (description !== undefined) products[productIndex].description = description;
    if (price !== undefined) products[productIndex].price = price;

    res.json(products[productIndex]);
});

// DELETE /products/:productId - Delete a product
app.delete('/products/:productId', authenticateToken, (req, res) => {
    const { productId } = req.params;
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) return res.status(404).json({ error: 'Product not found.' });

    products.splice(productIndex, 1);
    res.status(204).send();
});

/**
 * Checkout Endpoint
 */

// In-memory store for checkout sessions
let checkouts = [];

app.post('/checkout', authenticateToken, (req, res) => {
    const { productId, quantity = 1, customerEmail } = req.body;
    if (!productId || !customerEmail) {
        return res.status(400).json({ error: 'Field validation failed: productId and customerEmail are required fields.' });
    }

    const product = products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ error: 'Product not found.' });

    const checkoutId = uuidv4();
    const paymentUrl = `https://payment.gumroadclone.example.com/checkout/${checkoutId}`;

    const checkoutSession = {
        checkoutId,
        productId,
        quantity,
        customerEmail,
        paymentUrl
    };
    checkouts.push(checkoutSession);

    res.status(201).json({
        checkoutId,
        paymentUrl
    });
});

/**
 * Sales Endpoints
 */

// In-memory store for sales
let sales = [];

app.get('/sales', authenticateToken, (req, res) => {
    res.json(sales);
});

app.get('/sales/:saleId', authenticateToken, (req, res) => {
    const { saleId } = req.params;
    const sale = sales.find(s => s.id === saleId);
    if (!sale) return res.status(404).json({ error: 'Sale not found.' });
    res.json(sale);
});

/**
 * Users Endpoints
 */

// In-memory store for users
let users = [];

// In-memory store for active sessions
let sessions = [];

app.get('/users', authenticateToken, (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Field validation failed: email and password are required fields.' });
    }

    // Check if user with this email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists.' });
    }

    // NOTE: In production, NEVER store plain text passwords. Always hash passwords.
    const newUser = {
        id: uuidv4(),
        email,
        name: name || '',
        password
    };
    users.push(newUser);

    res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
    });
});

/**
 * Authentication Endpoint
 */

// POST /sessions - Login user and create a session
app.post('/sessions', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Field validation failed: email and password are required fields.' });
    }

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Generate a token (in a real app, use JWT)
    const token = uuidv4();
    
    // Create a new session
    const session = {
        id: uuidv4(),
        userId: user.id,
        token,
        createdAt: new Date()
    };
    sessions.push(session);

    // Return the token
    res.status(201).json({
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        }
    });
});

app.get('/users/:userId', authenticateToken, (req, res) => {
    const { userId } = req.params;
    const user = users.find(u => u.id === userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json({
        id: user.id,
        email: user.email,
        name: user.name
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Gumroad Clone API server running on port ${port}`);
    console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});
