const Category = require('../models/Category');

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a specific category by ID
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findById(req.params.categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update fields
    category.name = name || category.name;
    category.description = description || category.description;

    await category.save();
    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a specific category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.remove();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
