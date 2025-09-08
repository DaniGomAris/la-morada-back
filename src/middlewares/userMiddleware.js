const { validateUser } = require("../validations/userValidation");

function validateUserMiddleware(req, res, next) {
  try {
    validateUser(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { validateUserMiddleware };
