const AppointmentService = require("../services/appointmentService");

class AppointmentController {

  //Validacion de rol
  static checkPsychologistRole(role, res) {
    if (role !== "psychologist") {
      res.status(403).json({ error: "Acceso denegado: solo psicólogos" });
      return false;
    }
    return true;
  }

  // Crear una nueva cita (solo psychologist)
  static async create(req, res) {
    try {
      const { role } = req.body;

      // Valida que el rol sea psychologist
      if (!this.checkPsychologistRole(role, res)) return;

      const appointment = await AppointmentService.createAppointment(req.body);
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtener todas las citas (solo psychologist)
  static async getAll(req, res) {
    try {
      const { role } = req.query;

      // Valida que el rol sea psychologist
      if (!this.checkPsychologistRole(role, res)) return;

      const appointments = await AppointmentService.getAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener citas por usuario (solo psychologist) 
  static async getByUser(req, res) {
    try {
      const { role, userId } = req.query;

      // Valida que el rol sea psychologist
      if (!this.checkPsychologistRole(role, res)) return;

      const appointments = await AppointmentService.getAppointmentsByUser(userId, role);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Actualizar cita existente (solo psychologist)
  static async update(req, res) {
    try {
      const { role } = req.body;

      // Valida que el rol sea psychologist
      if (!this.checkPsychologistRole(role, res)) return;

      const appointment = await AppointmentService.updateAppointment(req.params.id, req.body);
      res.json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar cita (solo psychologist)
  static async delete(req, res) {
    try {
      const { role } = req.body;

      // Valida que el rol sea psychologist
      if (!this.checkPsychologistRole(role, res)) return;

      await AppointmentService.deleteAppointment(req.params.id);
      res.json({ message: "Cita eliminada correctamente" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AppointmentController;
