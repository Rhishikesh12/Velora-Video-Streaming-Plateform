const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");

const s3Client = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

const uploadToS3 = async (file, folder) => {
	const key = `${folder}/${uuidv4()}-${file.originalname}`;

	const command = new PutObjectCommand({
		Bucket: process.env.BUCKET_NAME,
		Key: key,
		Body: file.buffer,
		ContentType: file.mimetype,
	});

	await s3Client.send(command);
	return `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${key}`;
};

module.exports = { uploadToS3 };
