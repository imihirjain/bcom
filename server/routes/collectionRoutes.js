const express = require('express');
const {
  createCollection,
  getCollections,
  getCollectionById,
  updateCollection,
  deleteCollection
} = require('../controllers/collectionController');

const router = express.Router();

// Create a new collection
router.post('/', createCollection);

// Get all collections
router.get('/', getCollections);

// Get a specific collection by its ID
router.get('/:collectionId', getCollectionById);

// Update a specific collection by its ID
router.put('/:collectionId', updateCollection);

// Delete a specific collection by its ID
router.delete('/:collectionId', deleteCollection);

module.exports = router;
