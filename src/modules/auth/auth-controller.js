const AuthService = require("./auth-service");
const { handleError } = require("../../handlers/error-handler");
const logger = require("../../utils/logger");

class AuthController {
  // Login user
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.loginUser(email, password);

      res.status(200).json({
        success: true,
        status: "ok",
        message: "Login exitoso",
        user,
        token,
      });
      logger.info(`Login successful for email: ${email}`);
    } catch (err) {
      logger.error(`AuthController login failed: ${err.message}`);
      handleError(res, err);
    }
  }

  // Logout user
  static async logout(req, res) {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) throw new Error("UNAUTHORIZED");

      const token = authHeader.split(" ")[1];
      if (!token) throw new Error("TOKEN REQUIRED");

      await AuthService.logoutUser(token);

      res.status(200).json({
        success: true,
        status: "ok",
        message: "Logout exitoso",
      });
      logger.info("Logout successful");
    } catch (err) {
      logger.error(`AuthController logout failed: ${err.message}`);
      handleError(res, err);
    }
  }
}

module.exports = AuthController;
