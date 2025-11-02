const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    card_number: { type: String, required: true },
    card_name: { type: String, required: true },
    expiration_date: { type: String, required: true }, // MM/AA
    cvv: { type: String, required: true },
    user_id: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
