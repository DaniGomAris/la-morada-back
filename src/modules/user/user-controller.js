const UserService = require("./user-service");
const { handleError } = require("../../handlers/error-handler");
const logger = require("../../utils/logger");

class UserController {
  // Register user
  static async register(req, res) {
    try {
      const { password, rePassword, ...rest } = req.body;
      if (password !== rePassword) throw new Error("PASSWORD_MISMATCH");

      const user = await UserService.register({ ...rest, password });
      logger.info(`UserController.register: user created ${user.email}`);
      res.status(201).json({
        success: true,
        status: "ok",
        message: "Usuario creado exitosamente",
        user
      });
    } catch (err) {
      logger.error(`UserController.register: ${err.message}`);
      handleError(res, err);
    }
  }

  // Update user
  static async update(req, res) {
    try {
      const userId = req.params.id;
      const { password, rePassword, ...rest } = req.body;

      if (password && password !== rePassword) throw new Error("PASSWORD_MISMATCH");

      const updates = { ...rest };
      if (password) updates.password = password;

      const updatedUser = await UserService.update(userId, updates);
      logger.info(`UserController.update: user updated ${userId}`);
      res.status(200).json({
        success: true,
        message: "Usuario actualizado correctamente",
        user: updatedUser
      });
    } catch (err) {
      logger.error(`UserController.update: ${err.message}`);
      handleError(res, err);
    }
  }

  // Get all patients
  static async getPatients(req, res) {
    try {
      const users = await UserService.getPatients();
      logger.info(`UserController.getPatients: fetched ${users.length} patients`);
      res.status(200).json({ success: true, status: "ok", users });
    } catch (err) {
      logger.error(`UserController.getPatients: ${err.message}`);
      handleError(res, err);
    }
  }

  // Get all psychologists
  static async getPsychologists(req, res) {
    try {
      const users = await UserService.getPsychologists();
      logger.info(`UserController.getPsychologists: fetched ${users.length} psychologists`);
      res.status(200).json({ success: true, status: "ok", users });
    } catch (err) {
      logger.error(`UserController.getPsychologists: ${err.message}`);
      handleError(res, err);
    }
  }
}

module.exports = UserController;
