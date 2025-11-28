require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadDir));
const orderRoutes = require("./routes/order");
const settingsRoutes = require("./routes/settingsRoutes");

// Routes
app.use("/api/recipe-items", require("./routes/recepi"));

app.use("/api/settings", settingsRoutes);

app.use("/api/orders", orderRoutes);


// DB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
