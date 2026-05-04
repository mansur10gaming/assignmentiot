const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/items", require("./routes/sensorDeviceRoutes"));

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

module.exports = app;