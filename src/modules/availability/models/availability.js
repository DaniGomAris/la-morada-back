const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  start: { type: String, required: true },
  end: { type: String, required: true }
});

const availabilitySchema = new mongoose.Schema({
  days: { type: [String], required: true },
  slots: { type: [slotSchema], required: true }
});

module.exports = mongoose.model("Availability", availabilitySchema);
