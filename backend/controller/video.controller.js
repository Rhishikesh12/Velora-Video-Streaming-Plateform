const Video = require("../model/videoSchema");

const uploadVideo = async (req, res) => {
	try {
		const { title, description, uploader } = req.body;

		if (!title || !uploader) {
			return res.status(400).json({ error: "Title and uploader are required" });
		}

		if (!req.files?.video?.[0] || !req.files?.thumbnail?.[0]) {
			return res
				.status(400)
				.json({ error: "Both video and thumbnail are required" });
		}

		const newVideo = new Video({
			title,
			description,
			video_url: req.files.video[0].location,
			thumbnail: req.files.thumbnail[0].location,
			uploader,
		});

		await newVideo.save();

		res.status(201).json({
			status: "success",
			data: newVideo,
		});
	} catch (error) {
		if (error.name === "ValidationError") {
			return res.status(400).json({ error: error.message });
		}
		res.status(500).json({ error: error.message });
	}
};

const getAllVideos = async (req, res) => {
	try {
		const videos = await Video.find({});

		res.status(200).json({
			success: true,
			count: videos.length,
			data: videos,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getSingleVideo = async (req, res) => {
	try {
		const video = await Video.findById(req.params.id);

		if (!video) {
			return res.status(404).json({
				success: false,
				message: "Video not found",
			});
		}

		await video.save();

		res.status(200).json({
			success: true,
			data: video,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const likeVideo = async (req, res) => {
	try {
		const video = await Video.findById(req.params.id);
		const userId = req.user._id;

		if (!video) {
			return res.status(404).json({
				success: false,
				message: "Video not found",
			});
		}

		const index = video.likes.indexOf(userId);

		if (index === -1) {
			video.likes.push(userId);
		} else {
			video.likes.splice(index, 1);
		}

		await video.save();

		res.status(200).json({
			success: true,
			likesCount: video.likes.length,
			isLiked: index === -1,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const incrementViews = async (req, res) => {
	try {
		const video = await Video.findByIdAndUpdate(
			req.params.id,
			{ $inc: { views: 1 } },
			{ new: true }
		);

		if (!video) {
			return res.status(404).json({
				success: false,
				message: "Video not found",
			});
		}

		res.status(200).json({
			success: true,
			views: video.views,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const updateVideo = async (req, res) => {
	try {
		const { title, description } = req.body;
		const video = await Video.findByIdAndUpdate(req.params.id, {
			title,
			description,
		});

		if (!video) {
			return res.status(404).json({
				success: false,
				message: "Video not found",
			});
		}

		res.status(200).json({
			success: true,
			data: video,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = {
	uploadVideo,
	getAllVideos,
	getSingleVideo,
	likeVideo,
	incrementViews,
	updateVideo,
};
