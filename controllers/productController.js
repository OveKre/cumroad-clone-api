/**
 * Product Controller
 */

// Import dependencies
const Product = require('../models/product');
const { HTTP_STATUS, ERROR_CODES } = require('../utils/errorCodes');
const { validateProduct } = require('../utils/validation');

/**
 * Get all products
 */
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

/**
 * Get product by ID
 */
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(HTTP_STATUS.NOT_FOUND).json(ERROR_CODES.RESOURCE_NOT_FOUND);
    }
    
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new product
 */
const createProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    
    // Validate product data
    const validationError = validateProduct(productData);
    if (validationError) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(validationError);
    }
    
    // Add user ID from authenticated user
    productData.userId = req.user.id;
    
    // Create product
    const product = await Product.create(productData);
    
    // Set Location header
    res.location(`/products/${product.id}`);
    
    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * Update product
 */
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    
    // Validate product data
    const validationError = validateProduct(productData, false);
    if (validationError) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(validationError);
    }
    
    // Check if product exists
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(HTTP_STATUS.NOT_FOUND).json(ERROR_CODES.RESOURCE_NOT_FOUND);
    }
    
    // Check if user is authorized to update this product
    if (product.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(HTTP_STATUS.FORBIDDEN).json(ERROR_CODES.UNAUTHORIZED);
    }
    
    // Update product
    await product.update(productData);
    
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete product
 */
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if product exists
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(HTTP_STATUS.NOT_FOUND).json(ERROR_CODES.RESOURCE_NOT_FOUND);
    }
    
    // Check if user is authorized to delete this product
    if (product.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(HTTP_STATUS.FORBIDDEN).json(ERROR_CODES.UNAUTHORIZED);
    }
    
    // Delete product
    await product.destroy();
    
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
