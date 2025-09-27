const mongoose = require("mongoose");

// User model
const userSchema = new mongoose.Schema({
  _id: String,
  document_type: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  last_name1: { type: String, required: true },
  last_name2: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["patient", "psychologist"], default: "patient" },
  phone: { type: String, required: true },
  availability_id: { type: String, ref: "Availability" },
  specialty: { type: String },
  cart_id: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" }
});

module.exports = mongoose.model("User", userSchema);
