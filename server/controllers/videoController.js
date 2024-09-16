const cloudinary = require('../config/cloudinaryConfig');
const Video = require('../models/Video');

exports.uploadVideo = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, { resource_type: 'video' });
    const video = new Video({ videoUrl: result.secure_url });
    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVideo = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, { resource_type: 'video' });
    const video = await Video.findById(req.params.id);
    video.videoUrl = result.secure_url;
    await video.save();
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
