const User = require("../../user/models/user");

const validStatuses = ["pendiente", "confirmada", "cancelada", "completada"];

// Valida que la fecha sea valida y futura
function isValidDate(date) {
  const parsed = new Date(date);
  return !isNaN(parsed.getTime()) && parsed > new Date();
}

// Valida los datos de una cita
async function validateAppointment(data) {
  // Validar IDs
  if (!data.patientID) throw new Error("El patientID es obligatorio");
  if (!data.psychologistID) throw new Error("El psychologistID es obligatorio");

  // El paciente existe y rol
  const patient = await User.findById(data.patientID);
  if (!patient) throw new Error(`No se encontró paciente con ID ${data.patientID}`);
  if (patient.role !== "patient")
    throw new Error("El patientID debe pertenecer a un usuario con rol 'patient'");

  // Valida psicologo exista y rol
  const psychologist = await User.findById(data.psychologistID);
  if (!psychologist) throw new Error(`No se encontró psicólogo con ID ${data.psychologistID}`);
  if (psychologist.role !== "psychologist")
    throw new Error("El psychologistID debe pertenecer a un usuario con rol 'psychologist'");

  // Fecha futura
  if (!data.date) throw new Error("La fecha es obligatoria");
  if (!isValidDate(data.date)) throw new Error("La fecha debe ser válida y futura");

  // Validar estado de cita
  if (data.status && !validStatuses.includes(data.status)) {
    throw new Error("Estado de cita inválido");
  }
}

module.exports = { validateAppointment };
