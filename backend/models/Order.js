const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  restaurant: {
    name: String,
    address: String,
    gst: String,
  },
  customer: {
    name: String,
    phone: String,
  },
  payment: {
    method: String,
  },
  items: [
    {
      _id: false,
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "RecipeItem" },
      name: String,
      qty: Number,
      price: Number,
    },
  ],
  totals: {
    totalQty: Number,
    subTotal: Number,
    gstPercent: Number,
    gstAmount: Number,
    grandTotal: Number,
  },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
