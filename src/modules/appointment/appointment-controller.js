const {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByPatient,
  getAppointmentsByPsychologist
} = require("./appointment-service");
const { handleError } = require("../../handlers/error-handler");


// Controller to create a new appointment
async function createAppointmentController(req, res) {
  try {
    const appointment = await createAppointment(req.body);
    res.status(201).json({ success: true, appointment });
  } catch (err) {
    handleError(res, err);
  }
}


// Controller to update an appointment
async function updateAppointmentController(req, res) {
  try {
    const appointment = await updateAppointment(req.params.id, req.body);
    res.status(200).json({ success: true, appointment });
  } catch (err) {
    handleError(res, err);
  }
}


// Controller to delete an appointment
async function deleteAppointmentController(req, res) {
  try {
    const result = await deleteAppointment(req.params.id);
    res.status(200).json({ success: true, result });
  } catch (err) {
    handleError(res, err);
  }
}


// Controller to get appointments depending on user role
async function getAppointmentsController(req, res) {
  try {
    let appointments;
    if (req.user.role === "PATIENT") {
      appointments = await getAppointmentsByPatient(req.user.user_id);
    } else if (req.user.role === "PSYCHOLOGIST") {
      appointments = await getAppointmentsByPsychologist(req.user.user_id);
    } else {
      throw new Error("ACCESS DENIED");
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
