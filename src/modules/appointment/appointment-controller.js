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
    const appointment = await createAppointment(req.body, req.user);
    res.status(201).json(appointment);
  } catch (err) {
    handleError(res, err);
  }
}

// Editar cita
async function updateAppointmentController(req, res) {
  try {
    const appointment = await updateAppointment(req.params.id, req.body, req.user);
    return res.status(200).json({
      success: true,
      message: "Cita actualizada correctamente",
      appointment
    });
  } catch (err) {
    return handleError(res, err);
  }
}

// Eliminar cita
async function deleteAppointmentController(req, res) {
  try {
    const result = await deleteAppointment(req.params.id, req.user);
    res.status(200).json({ success: true, result });
  } catch (err) {
    return handleError(res, err);
  }
}

// Obtener citas
async function getAppointmentsController(req, res) {
  try {
    let appointments;

    if (req.user.role === "user") {
      appointments = await getAppointmentsByPatient(req.user._id);
    } else if (req.user.role === "admin") {
      appointments = await getAppointmentsByPsychologist(req.user._id);
    } else {
      return res.status(403).json({ message: "Rol no autorizado" });
    }

    res.json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createAppointmentController,
  updateAppointmentController,
  deleteAppointmentController,
  getAppointmentsController
};
