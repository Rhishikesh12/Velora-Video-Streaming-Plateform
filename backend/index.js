const express = require("express");
const cors = require("cors");
const app = express();
const { DBconnection } = require("./utils/config.utils");
const videoRoutes = require("./routes/video.routes");

DBconnection();

app.use(cors());
app.use(express.json());

app.use("/api/videos", videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
