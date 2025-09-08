const validStatuses = ["pendiente", "confirmada", "cancelada", "completada"];

// Valida que la fecha sea valida y futura
function isValidDate(date) {
  const parsed = new Date(date);
  return !isNaN(parsed.getTime()) && parsed > new Date();
}

// Valida los datos de una cita
function validateAppointment(data) {

  // Valida existencia de IDs
  if (!data.patientID) throw new Error("El pacienteId es obligatorio");
  if (!data.psychologistID) throw new Error("El psicologoId es obligatorio");

  // Valida fecha
  if (!data.date) throw new Error("La fecha es obligatoria");
  if (!isValidDate(data.date)) throw new Error("La fecha debe ser válida y futura");

  // Valida estado de la cita si se proporciona
  if (data.status && !validStatuses.includes(data.status)) {
    throw new Error("Estado de cita inválido");
  }
}

module.exports = { validateAppointment };
