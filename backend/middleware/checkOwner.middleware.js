const checkOwner = async (req, res, next) => {
	const video = await Video.findById(req.params.id);
	if (video.uploader.toString() !== req.user.id) {
		return res.status(403).json({
			success: false,
			message: "You don't have permission to perform this action",
		});
	}
	next();
};

module.exports = { checkOwner };
