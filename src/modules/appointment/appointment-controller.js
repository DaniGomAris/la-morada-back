const {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByPatient,
  getAppointmentsByPsychologist
} = require("./appointment-service");
const { handleError } = require("../../handlers/error-handler");

async function createAppointmentController(req, res) {
  try {
    const appointment = await createAppointment(req.body);
    res.status(201).json({ success: true, appointment });
  } catch (err) {
    handleError(res, err);
  }
}

async function updateAppointmentController(req, res) {
  try {
    const appointment = await updateAppointment(req.params.id, req.body);
    res.status(200).json({ success: true, appointment });
  } catch (err) {
    handleError(res, err);
  }
}

async function deleteAppointmentController(req, res) {
  try {
    const result = await deleteAppointment(req.params.id);
    res.status(200).json({ success: true, result });
  } catch (err) {
    handleError(res, err);
  }
}

async function getAppointmentsController(req, res) {
  try {
    let appointments;
    if (req.user.role === "patient") {
      appointments = await getAppointmentsByPatient(req.user._id);
    } else if (req.user.role === "psychologist") {
      appointments = await getAppointmentsByPsychologist(req.user._id);
    } else {
      return res.status(403).json({ message: "Rol no autorizado" });
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
