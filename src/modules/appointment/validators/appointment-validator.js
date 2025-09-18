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

  const patient = await User.findById(data.patientID);
  if (!patient) throw new Error("USER NOT FOUND");
  if (patient.role !== "PATIENT") throw new Error("INVALID ROLE");

  const psychologist = await User.findById(data.psychologistID);
  if (!psychologist) throw new Error("USER NOT FOUND");
  if (psychologist.role !== "PSYCHOLOGIST") throw new Error("INVALID ROLE");

  if (!data.date) throw new Error("INVALID PARAMS");
  if (!isValidDate(data.date)) throw new Error("INVALID PARAMS");

  if (data.status && !VALID_STATUSES.includes(data.status.toUpperCase())) {
    throw new Error("INVALID STATUS");
  }
}

module.exports = { validateAppointment };
