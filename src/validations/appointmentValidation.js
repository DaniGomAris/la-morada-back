const validStatuses = ["pendiente", "confirmada", "cancelada", "completada"];

function isValidDate(date) {
  const parsed = new Date(date);
  return !isNaN(parsed.getTime()) && parsed > new Date();
}

function validateAppointment(data) {
  if (!data.patientID) throw new Error("El pacienteId es obligatorio");
  if (!data.psychologistID) throw new Error("El psicologoId es obligatorio");

  if (!data.date) throw new Error("La fecha es obligatoria");
  if (!isValidDate(data.date)) throw new Error("La fecha debe ser válida y futura");

  if (data.status && !validStatuses.includes(data.status)) {
    throw new Error("Estado de cita inválido");
  }
}

module.exports = { validateAppointment };
