const Product = require('../models/Product');
const Category = require('../models/Category');
const cloudinary = require('../config/cloudinaryConfig');

// Create a new product under a specific category
exports.createProduct = async (req, res) => {
  try {
    const { name, size, price, description } = req.body;
    const { categoryId } = req.params;

    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Cloudinary transformations for image compression
    const imageCompressionOptions = {
      transformation: [
        { width: 1000, crop: "limit" }, // Limit image width to 1000px
        { quality: "auto" }, // Automatically adjust image quality
      ],
    };

    // Upload and compress multiple images to Cloudinary
    const images = await Promise.all(
      req.files.map((file) =>
        cloudinary.uploader.upload(file.path, imageCompressionOptions)
      )
    );

    const imageUrls = images.map((image) => image.secure_url);

    // Create the product
    const product = new Product({
      name,
      size,
      price,
      description,
      images: imageUrls,
      category: categoryId,
    });

    // Save the product to the database
    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products for a specific category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const products = await Product.find({ category: categoryId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific product by ID
exports.getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a specific product
exports.updateProduct = async (req, res) => {
  try {
    const { productId, categoryId } = req.params;
    const { name, size, price, description } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update the product fields
    if (name) product.name = name;
    if (size) product.size = size;
    if (price) product.price = price;
    if (description) product.description = description;

    // Check if new images are uploaded
    if (req.files && req.files.length > 0) {
      // Upload new images to Cloudinary
      const images = await Promise.all(
        req.files.map((file) => cloudinary.uploader.upload(file.path))
      );
      product.images = images.map((image) => image.secure_url);
    }

    // Save the updated product
    await product.save();

    res.status(200).json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the product
    await product.remove();

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products without category ID
exports.getAllProducts = async (req, res) => {
  try {
    // Fetch all products and populate the related category and collection details
    const products = await Product.find()
      .populate('category')        // Assuming 'category' field stores category ID
      // .populate('collection');     // Assuming 'collection' field stores collection ID (if any)

    // Send response with all products and their full details
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
