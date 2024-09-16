const express = require('express');
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

const router = express.Router();

// Create a new category
router.post('/', createCategory);

// Get all categories
router.get('/', getAllCategories);

// Get a specific category by its ID
router.get('/:categoryId', getCategoryById);

// Update a specific category by its ID
router.put('/:categoryId', updateCategory);

// Delete a specific category by its ID
router.delete('/:categoryId', deleteCategory);

module.exports = router;
