const { loginUser } = require("./auth-service");
const { handleError } = require("../../handlers/error-handler");

// Iniciar sesion
async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    // Valida datos y genera JWT
    const { user, token } = await loginUser(email, password);

    res.status(200).json({
      success: true,
      status: "ok",
      message: "Login exitoso",
      user,
      token
    });
  } catch (err) {
    handleError(res, err);
  }
}

module.exports = { loginController };
