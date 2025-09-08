const { validateAppointment } = require("../validations/appointmentValidation");

function validateAppointmentMiddleware(req, res, next) {
  try {
    validateAppointment(req.body);
    next();
  } catch (error) {
    console.log("Middleware error:", error.message, req.body);
    res.status(400).json({ error: error.message });
  }
}

module.exports = validateAppointmentMiddleware;
