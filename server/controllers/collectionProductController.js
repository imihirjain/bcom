const CollectionProduct = require('../models/CollectionProduct');
const cloudinary = require('../config/cloudinaryConfig');

// Create a new product under a specific collection
exports.createCollectionProduct = async (req, res) => {
  try {
    const { name, size, price, description } = req.body;
    const images = await Promise.all(req.files.map(file => cloudinary.uploader.upload(file.path)));
    const imageUrls = images.map(image => image.secure_url);

    const product = new CollectionProduct({
      name,
      size,
      price,
      description,
      images: imageUrls,
      collection: req.params.collectionId
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products for a specific collection
exports.getCollectionProducts = async (req, res) => {
  try {
    const products = await CollectionProduct.find({ collection: req.params.collectionId });
    if (!products) {
      return res.status(404).json({ message: 'No products found for this collection' });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all collection products without collection ID
exports.getAllCollectionProducts = async (req, res) => {
  try {
    // Fetch all products and populate the collection details
    const products = await CollectionProduct.find()
      .populate('collection'); // Assuming 'collection' field stores the collection ID

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a specific product by ID
exports.getCollectionProductById = async (req, res) => {
  try {
    const product = await CollectionProduct.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product in a specific collection
exports.updateCollectionProduct = async (req, res) => {
  try {
    const { name, size, price, description } = req.body;
    const product = await CollectionProduct.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product fields
    product.name = name || product.name;
    product.size = size || product.size;
    product.price = price || product.price;
    product.description = description || product.description;

    // If new images are uploaded, replace the existing ones
    if (req.files && req.files.length > 0) {
      const images = await Promise.all(req.files.map(file => cloudinary.uploader.upload(file.path)));
      product.images = images.map(image => image.secure_url);
    }

    await product.save();
    res.status(200).json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product from a specific collection
exports.deleteCollectionProduct = async (req, res) => {
  try {
    const product = await CollectionProduct.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
