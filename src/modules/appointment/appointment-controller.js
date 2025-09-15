const {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByPatient,
  getAppointmentsByPsychologist
} = require("./appointment-service");
const { handleError } = require("../../handlers/error-handler");

// Crear cita
async function createAppointmentController(req, res) {
  try {
    const appointment = await createAppointment(req.body);
    res.status(201).json({ success: true, appointment });
  } catch (err) {
    handleError(res, err);
  }
}

// Actualizar cita
async function updateAppointmentController(req, res) {
  try {
    const appointment = await updateAppointment(req.params.id, req.body);
    res.status(200).json({ success: true, appointment });
  } catch (err) {
    handleError(res, err);
  }
}

// Eliminar cita
async function deleteAppointmentController(req, res) {
  try {
    const result = await deleteAppointment(req.params.id);
    res.status(200).json({ success: true, result });
  } catch (err) {
    handleError(res, err);
  }
}

// Obtener citas por usuario y por psicologo
async function getAppointmentsController(req, res) {
  try {
    let appointments;
    if (req.user.role === "patient") {
      appointments = await getAppointmentsByPatient(req.user.user_id);
    } else if (req.user.role === "psychologist") {
      appointments = await getAppointmentsByPsychologist(req.user.user_id);
    } else {
      throw new Error("No autorizado");
    }
    res.json({ success: true, appointments });
  } catch (err) {
    handleError(res, err);
  }
}

module.exports = {
  createAppointmentController,
  updateAppointmentController,
  deleteAppointmentController,
  getAppointmentsController
};
