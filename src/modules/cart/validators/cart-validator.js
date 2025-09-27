const mongoose = require("mongoose");

function validateCartItem(data) {
  if (!data.product_id || !mongoose.Types.ObjectId.isValid(data.product_id)) {
    throw new Error("INVALID PRODUCT_ID");
  }

  if (data.quantity !== undefined) {
    if (typeof data.quantity !== "number" || data.quantity < 1) {
      throw new Error("INVALID QUANTITY");
    }
  }
}

module.exports = { validateCartItem };
