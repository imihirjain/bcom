// routes/mediaRoutes.js
const express = require('express');
const multer = require('multer');
const mediaController = require('../controllers/mediaController');

const router = express.Router();

// Multer configuration for file upload
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Routes
router.post('/upload', upload.single('file'), mediaController.uploadMedia);
router.get('/all', mediaController.getAllMedia);
router.delete('/:id', mediaController.deleteMedia);

module.exports = router;
