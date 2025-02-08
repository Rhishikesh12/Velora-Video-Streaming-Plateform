const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const mongoose = require("mongoose");
require("dotenv").config();

const DBconnection = async () => {
	try {
		await mongoose
			.connect(process.env.MONGO_URL)
			.then(() => console.log("DB Connection Successfull!"))
			.catch((err) => {
				console.log(err);
			});
	} catch (error) {
		console.error("MongoDB connection failed:", error);
	}
};

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 1024 * 1024 * 100,
	},
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith("video/")) {
			cb(null, true);
		} else {
			cb(new Error("Not a video file"), false);
		}
	},
});

const s3Client = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

module.exports = { DBconnection, upload, s3Client };
