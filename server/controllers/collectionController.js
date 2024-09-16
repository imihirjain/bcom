const Collection = require('../models/Collection');

// Create a new collection
exports.createCollection = async (req, res) => {
  try {
    const collection = new Collection(req.body);
    await collection.save();
    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all collections
exports.getCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific collection by ID
exports.getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a specific collection
exports.updateCollection = async (req, res) => {
  try {
    const { name, description } = req.body;
    const collection = await Collection.findById(req.params.collectionId);

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    // Update fields
    collection.name = name || collection.name;
    collection.description = description || collection.description;

    await collection.save();
    res.status(200).json({ message: 'Collection updated successfully', collection });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a specific collection
exports.deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    await collection.remove();
    res.status(200).json({ message: 'Collection deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
