const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  restaurantName: String,
  address: String,
  gstNumber: String,
  phone: String,
  theme: { type: String, default: "light" },
  taxPercent: { type: Number, default: 5 },
  printerSize: { type: String, default: "58mm" },
}, { timestamps: true });

module.exports = mongoose.model("Settings", settingsSchema);
