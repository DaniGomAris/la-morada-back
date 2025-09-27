const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  products_id: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  total: { type: Number, default: 0 },
});

module.exports = mongoose.model("Cart", CartSchema);
