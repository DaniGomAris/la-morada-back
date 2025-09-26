const User = require("../../user/models/user-model");

const VALID_STATUSES = ["PENDIENTE", "CONFIRMADA", "CANCELADA", "COMPLETADA"];

// Check if a date is valid and in the future
function isValidDate(date) {
  const parsed = new Date(date);
  return !isNaN(parsed.getTime()) && parsed > new Date();
}


// Validate appointment data
async function validateAppointment(data) {
  if (!data.patientID) throw new Error("PATIENTID REQUIRED");
  if (!data.psychologistID) throw new Error("PSYCHOLOGISTID REQUIRED");

  // Validate patient if exists
  const patient = await User.findById(data.patientID);
  if (!patient) throw new Error("USER NOT FOUND");
  if (patient.role !== "patient") throw new Error("INVALID ROLE");

  // Validate patient if exists
  const psychologist = await User.findById(data.psychologistID);
  if (!psychologist) throw new Error("USER NOT FOUND");
  if (psychologist.role !== "psychologist") throw new Error("INVALID ROLE");

  // Validate date be present
  if (!data.date) throw new Error("INVALID PARAMS");
  if (!isValidDate(data.date)) throw new Error("INVALID PARAMS");

  // Validate status be present
  if (data.status && !VALID_STATUSES.includes(data.status.toUpperCase())) {
    throw new Error("INVALID STATUS");
  }
}

module.exports = { validateAppointment };
