const express = require("express");
const router = express.Router();
const {
	getAllVideos,
	getSingleVideo,
	likeVideo,
	incrementViews,
	updateVideo,
	uploadVideo,
} = require("../controller/video.controller");
const { uploadImgVid } = require("../middleware/upload.middleware");

// upload videos
router.post("/upload", uploadImgVid, uploadVideo);

// Get all videos
router.get("/", getAllVideos);

// Get single video
router.get("/:id", getSingleVideo);

// Like/Unlike a video
router.patch("/:id/like", likeVideo);

// Increment views
router.post("/:id/view", incrementViews);

// Update video title and desctioption
router.put("/:id", updateVideo);

module.exports = router;
