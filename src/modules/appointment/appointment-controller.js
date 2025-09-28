const AppointmentService = require("./appointment-service");
const { handleError } = require("../../handlers/error-handler");
const logger = require("../../utils/logger");

class AppointmentController {

  // Create appointment
  static async create(req, res) {
    try {
      const appointmentData = {
        // Appointment data according to the user's role
        patient_id: req.user.role === "patient" ? req.user.user_id : req.body.patient_id,
        psychologist_id: req.body.psychologist_id,
        start: req.body.start
      };

      // Call service for create appointment
      const appointment = await AppointmentService.createAppointment(appointmentData);

      logger.info(`AppointmentController: Appointment created for patient ${appointmentData.patient_id} by user ${req.user.user_id}`);
      res.status(201).json({ success: true, appointment });

    } catch (err) {
      logger.error(`AppointmentController create failed: ${err.message}`);
      handleError(res, err);
    }
  }

  // Delete appointment
  static async remove(req, res) {
    try {
      const result = await AppointmentService.deleteAppointment(req.params.id);
      logger.info(`AppointmentController: Appointment deleted ${req.params.id} by user ${req.user.user_id}`);
      res.status(200).json({ success: true, result });
   } catch (err) {
      logger.error(`AppointmentController remove failed: ${err.message}`);
      handleError(res, err);
    }
  }

  // Get all user role appointments
  static async getAll(req, res) {
    try {
      let appointments;

      // If role is patient
      if (req.user.role === "patient") {
        appointments = await AppointmentService.getAppointmentsByPatient(req.user.user_id);

        // If role is psychologist
      } else if (req.user.role === "psychologist") {
        appointments = await AppointmentService.getAppointmentsByPsychologist(req.user.user_id);
      } else {
        // Other roles dont hace access
        throw new Error("ACCESS DENIED");
      }
      logger.info(`AppointmentController: Retrieved ${appointments.length} appointments for user ${req.user.user_id}`);
      res.json({ success: true, appointments });
    } catch (err) {
      logger.error(`AppointmentController getAll failed: ${err.message}`);
      handleError(res, err);
    }
  }

  // Change status 
  static async updateStatus(req, res) {
    try {
      const { status } = req.body;
      const appointment = await AppointmentService.updateAppointmentStatus(req.params.id, req.user, status);
      logger.info(`AppointmentController: Appointment ${req.params.id} status updated to ${status} by user ${req.user.user_id}`);
      res.status(200).json({ success: true, appointment });
    } catch (err) {
      logger.error(`AppointmentController updateStatus failed: ${err.message}`);
      handleError(res, err);
    }
  }
}

module.exports = AppointmentController;
