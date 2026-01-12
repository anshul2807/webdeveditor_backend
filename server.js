require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Health check (REQUIRED)
app.get("/", (req, res) => {
  res.status(200).send("OK");
});

// Routes
app.use("/api", projectRoutes);

// ✅ Start server IMMEDIATELY
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// ✅ Connect MongoDB asynchronously (NON-BLOCKING)
setTimeout(() => {
  if (!process.env.MONGO_URI) {
    console.warn("MONGO_URI not set. Skipping MongoDB connection.");
    return;
  }

  mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // ⛔ prevents startup hang
    socketTimeoutMS: 45000,
  })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Error:", err.message));
}, 0);

// Safety net
process.on("unhandledRejection", err => {
  console.error("Unhandled Promise Rejection:", err);
});
