// controllers/mediaController.js
const cloudinary = require('../config/cloudinaryConfig');
const Media = require('../models/Media');

// Upload media (Image or Video) to Cloudinary
exports.uploadMedia = async (req, res) => {
  try {
    const { type } = req.body;
    const file = req.file.path;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file, {
      resource_type: type === 'video' ? 'video' : 'image',
    });

    // Save media information to the database
    const media = new Media({
      type,
      url: result.secure_url,
      public_id: result.public_id,
    });

    await media.save();

    res.status(201).json({
      message: 'Media uploaded successfully!',
      media,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading media.' });
  }
};

// Get all media
exports.getAllMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching media.' });
  }
};

// Delete media by ID
exports.deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const media = await Media.findById(id);
    if (!media) {
      return res.status(404).json({ error: 'Media not found.' });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(media.public_id, {
      resource_type: media.type === 'video' ? 'video' : 'image',
    });

    // Delete from database
    await media.remove();

    res.status(200).json({ message: 'Media deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting media.' });
  }
};
