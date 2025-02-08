const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
		},
		description: {
			type: String,
		},
		video_url: {
			type: String,
			required: [true, "Video URL is required"],
			unique: true,
		},
		qualities: [
			{
				resolution: {
					type: String,
					enum: ["360p", "480p", "720p", "1080p"],
				},
				url: String,
			},
		],
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		views: {
			type: Number,
			default: 0,
		},
		thumbnail: {
			type: String,
			required: [true, "Thumbnail is required"],
		},
		uploader: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Video", videoSchema);
