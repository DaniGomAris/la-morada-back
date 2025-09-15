// services/appointment.service.js
const Appointment = require("./models/appointment");
const User = require("../user/models/user");

async function createAppointment(data) {
  try {
    const { patientID, psychologistID, date, notes } = data;

    // 1. Validaciones de campos requeridos
    if (!patientID) throw new Error("El campo 'patientID' es obligatorio");
    if (!psychologistID) throw new Error("El campo 'psychologistID' es obligatorio");
    if (!date) throw new Error("El campo 'date' es obligatorio");

    // 2. Validar que paciente existe
    const patient = await User.findById(patientID);
    if (!patient) throw new Error(`No se encontró paciente con cédula ${patientID}`);
    if (patient.role !== "user")
      throw new Error("El 'patientID' debe pertenecer a un usuario con rol 'user'");

    // 3. Validar que psicólogo existe
    const psychologist = await User.findById(psychologistID);
    if (!psychologist) throw new Error(`No se encontró psicólogo con cédula ${psychologistID}`);
    if (psychologist.role !== "admin")
      throw new Error("El 'psychologistID' debe pertenecer a un usuario con rol 'psychologist'");

    // 4. Validar fecha futura
    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate)) throw new Error("Formato de fecha inválido");
    if (appointmentDate < new Date())
      throw new Error("La fecha de la cita debe ser en el futuro");

    // 5. Crear cita
    const appointment = new Appointment({
      patientID,
      psychologistID,
      date: appointmentDate,
      notes,
    });

    await appointment.save();
    return { success: true, message: "Cita creada exitosamente", appointment };
  } catch (error) {
    console.error("Error en createAppointment:", error.message);
    return { success: false, message: error.message };
  }
}

module.exports = { createAppointment };
