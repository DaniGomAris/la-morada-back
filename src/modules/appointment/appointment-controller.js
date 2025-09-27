const AppointmentService = require("./appointment-service");
const { handleError } = require("../../handlers/error-handler");

class AppointmentController {
  // Create appointment
  static async create(req, res) {
    try {
      // If the role is patient, force to use their own user_id
      const appointmentData = {
        patient_id: req.user.role === "patient" ? req.user.user_id : req.body.patient_id,
        psychologist_id: req.body.psychologist_id,
        start: req.body.start
      };

      const appointment = await AppointmentService.createAppointment(appointmentData);
      res.status(201).json({ success: true, appointment });
    } catch (err) {
      handleError(res, err);
    }
  }

  // Delete appointment
  static async remove(req, res) {
    try {
      const result = await AppointmentService.deleteAppointment(req.params.id);
      res.status(200).json({ success: true, result });
    } catch (err) {
      handleError(res, err);
    }
  }

  // Get all appointments (patient or psychologist)
  static async getAll(req, res) {
    try {
      let appointments;
      if (req.user.role === "patient") {
        appointments = await AppointmentService.getAppointmentsByPatient(req.user.user_id);
      } else if (req.user.role === "psychologist") {
        appointments = await AppointmentService.getAppointmentsByPsychologist(req.user.user_id);
      } else {
        throw new Error("ACCESS DENIED");
      }
      res.json({ success: true, appointments });
    } catch (err) {
      handleError(res, err);
    }
  }

  // Update the status
  static async updateStatus(req, res) {
    try {
      const { status } = req.body;
      const appointment = await AppointmentService.updateAppointmentStatus(req.params.id, req.user, status);
      res.status(200).json({ success: true, appointment });
    } catch (err) {
      handleError(res, err);
    }
  }
}

module.exports = AppointmentController;
