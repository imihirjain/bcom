const express = require("express");
const {
  uploadVideo,
  updateVideo,
  getAllVideos,
} = require("../controllers/videoController");
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/video", upload.single("video"), uploadVideo);
router.put("/video/:id", upload.single("video"), updateVideo);
router.get("/video", getAllVideos);

module.exports = router;
