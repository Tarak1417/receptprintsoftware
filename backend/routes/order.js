const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST - Create Order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - All orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Filter by week/month/year
router.get("/filter", async (req, res) => {
  const { type } = req.query;

  let startDate = new Date();
  if (type === "weekly") startDate.setDate(startDate.getDate() - 7);
  if (type === "monthly") startDate.setMonth(startDate.getMonth() - 1);
  if (type === "yearly") startDate.setFullYear(startDate.getFullYear() - 1);

  try {
    const orders = await Order.find({
      date: { $gte: startDate },
    }).sort({ date: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
