const express = require('express');
const multer = require('multer');
const {
  createCollectionProduct,
  getCollectionProducts,
  getAllCollectionProducts,
  getCollectionProductById,
  updateCollectionProduct,
  deleteCollectionProduct,
} = require('../controllers/collectionProductController');

const router = express.Router();

// Configure multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Get all collection products (no collection ID needed)
router.get('/products', getAllCollectionProducts);

// Create a new product under a specific collection
router.post('/:collectionId/products', upload.array('images', 5), createCollectionProduct);

// Get all products for a specific collection
router.get('/:collectionId/products', getCollectionProducts);

// Get a specific product by its ID
router.get('/:collectionId/products/:productId', getCollectionProductById);

// Update a specific product in a collection
router.put('/:collectionId/products/:productId', upload.array('images', 5), updateCollectionProduct);

// Delete a product from a specific collection
router.delete('/:collectionId/products/:productId', deleteCollectionProduct);

module.exports = router;
