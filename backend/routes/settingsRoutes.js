const express = require("express");
const router = express.Router();
const Settings = require("../models/Settings");

// GET Settings (fetch first)
router.get("/", async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE or CREATE Settings
router.post("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    if (settings) {
      const updated = await Settings.findOneAndUpdate({}, req.body, { new: true });
      return res.json(updated);
    }
    
    settings = new Settings(req.body);
    const saved = await settings.save();
    res.json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
