const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.S3_BUCKET_NAME,
		acl: "public-read",
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			const folder = file.fieldname === "video" ? "videos/" : "thumbnails/";
			const filename = Date.now() + "-" + file.originalname;
			cb(null, folder + filename);
		},
	}),
	fileFilter: (req, file, cb) => {
		if (file.fieldname === "video" && !file.mimetype.startsWith("video/")) {
			return cb(new Error("Only video files are allowed"), false);
		}
		if (file.fieldname === "thumbnail" && !file.mimetype.startsWith("image/")) {
			return cb(new Error("Only image files are allowed"), false);
		}
		cb(null, true);
	},
});

exports.uploadImgVid = upload.fields([
	{ name: "video", maxCount: 1 },
	{ name: "thumbnail", maxCount: 1 },
]);
