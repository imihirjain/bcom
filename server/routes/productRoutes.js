const express = require('express');
const {
  createProduct,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require('../controllers/productController');
const multer = require('multer');

const router = express.Router();

// Configure multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Fetch all products without category ID
router.get('/products', getAllProducts);

// Create a new product under a specific category
router.post('/:categoryId/products', upload.array('images', 5), createProduct);

// Get all products for a specific category
router.get('/:categoryId/products', getProductsByCategory);

// Get a specific product by its ID
router.get('/:categoryId/products/:productId', getProductById);

// Update a specific product
router.put('/:categoryId/products/:productId', upload.array('images', 5), updateProduct);

// Delete a specific product
router.delete('/:categoryId/products/:productId', deleteProduct);

module.exports = router;
