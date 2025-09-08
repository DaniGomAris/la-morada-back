const { validateUser } = require("../validations/userValidation");

// Validar los datos de un usuario antes de procesarlo
function validateUserMiddleware(req, res, next) {
  try {
    // Valida los datos del body usando la validación
    validateUser(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { validateUserMiddleware };
