const Appointment = require("./models/appointment");
const { validateAppointment } = require("./validators/appointment-validator");

// Create appointment
async function createAppointment(data) {
  await validateAppointment(data);

  const appointment = new Appointment({
    patientID: data.patientID,
    psychologistID: data.psychologistID,
    date: new Date(data.date),
    notes: data.notes,
    status: data.status || "PENDIENTE",
  });

  await appointment.save();
  return appointment;
}


// Update appointment
async function updateAppointment(id, data) {
  const appointment = await Appointment.findById(id);
  if (!appointment) throw new Error("APPOINTMENT NOT FOUND");

  await validateAppointment({ ...appointment.toObject(), ...data });

  const allowedFields = ["patientID", "psychologistID", "date", "notes", "status"];
  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      appointment[field] = data[field];
    }
  }

  await appointment.save();
  return appointment;
}


// Delete an appointment
async function deleteAppointment(id) {
  const appointment = await Appointment.findByIdAndDelete(id);
  if (!appointment) throw new Error("APPOINTMENT NOT FOUND");
  return appointment;
}


// Get appointments by patient
async function getAppointmentsByPatient(patientID) {
  return await Appointment.find({ patientID }).sort({ date: 1 });
}


// Get appointments by psychologist
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
