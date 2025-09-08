const AppointmentService = require("../services/appointmentService");

class AppointmentController {
  static async create(req, res) {
    try {
      const appointment = await AppointmentService.createAppointment(req.body);
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const { role } = req.query;
      if (role !== "admin") return res.status(403).json({ error: "Acceso denegado" });

      const appointments = await AppointmentService.getAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getByUser(req, res) {
    try {
      const { userId, role } = req.query;
      const appointments = await AppointmentService.getAppointmentsByUser(userId, role);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const appointment = await AppointmentService.updateAppointment(req.params.id, req.body);
      res.json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await AppointmentService.deleteAppointment(req.params.id);
      res.json({ message: "Cita eliminada correctamente" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AppointmentController;
