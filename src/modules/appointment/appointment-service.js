const Appointment = require("./models/appointment");
const { validateAppointment } = require("./validators/appointment-validator");

// Crear cita
async function createAppointment(data) {
  await validateAppointment(data);

  const appointment = new Appointment({
    patientID: data.patientID,
    psychologistID: data.psychologistID,
    date: new Date(data.date),
    notes: data.notes,
    status: data.status || "pendiente",
  });

  await appointment.save();
  return appointment;
}

// Editar cita
async function updateAppointment(id, data) {
  const appointment = await Appointment.findById(id);
  if (!appointment) throw new Error("Cita no encontrada");

  // Validar datos
  await validateAppointment({ ...appointment.toObject(), ...data });

  // Actualizar campos
  ["patientID", "psychologistID", "date", "notes", "status"].forEach(field => {
    if (data[field] !== undefined) appointment[field] = data[field];
  });

  await appointment.save();
  return appointment;
}

// Eliminar cita
async function deleteAppointment(id) {
  const appointment = await Appointment.findByIdAndDelete(id);
  if (!appointment) throw new Error("Cita no encontrada");
  return appointment;
}

// Obtener citas por paciente
async function getAppointmentsByPatient(patientID) {
  return await Appointment.find({ patientID }).sort({ date: 1 });
}

// Obtener citas por psicologo
async function getAppointmentsByPsychologist(psychologistID) {
  return await Appointment.find({ psychologistID }).sort({ date: 1 });
}

module.exports = {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByPatient,
  getAppointmentsByPsychologist,
};
