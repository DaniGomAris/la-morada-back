const { validateAppointment } = require("../validations/appointmentValidation");

// Validar los datos de una cita antes de procesarla
function validateAppointmentMiddleware(req, res, next) {
  try {
    // Valida los datos del body usando la validación
    validateAppointment(req.body);
    next();
  } catch (error) {
    console.log("Middleware error:", error.message, req.body);
    res.status(400).json({ error: error.message });
  }
}

module.exports = validateAppointmentMiddleware;
