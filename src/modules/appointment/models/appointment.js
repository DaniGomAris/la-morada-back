const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient_id: { type: String, ref: "User", required: true },
  psychologist_id: { type: String, ref: "User", required: true },
  day: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  status: { type: String, enum: ["pendiente", "completada", "cancelada"], default: "pendiente" }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
