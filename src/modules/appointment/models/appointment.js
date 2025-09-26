const mongoose = require("mongoose");

// Appointment estructure
const appointmentSchema = new mongoose.Schema(
  {
    patientID: { type: String, ref: "User", required: true },
    psychologistID: { type: String, ref: "User", required: true },
    date: { type: Date, required: true },
    status: { type: String, default: "pendiente" },
    notes: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
