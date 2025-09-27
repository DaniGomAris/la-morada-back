const UserService = require("./user-service");
const { handleError } = require("../../handlers/error-handler");

class UserController {
  // Register user
  static async register(req, res) {
    try {
      const { password, rePassword, ...rest } = req.body;
      if (password !== rePassword) throw new Error("PASSWORD_MISMATCH");

      const user = await UserService.register({ ...rest, password });
      res.status(201).json({
        success: true,
        status: "ok",
        message: "Usuario creado exitosamente",
        user
      });
    } catch (err) {
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
      res.status(200).json({
        success: true,
        message: "Usuario actualizado correctamente",
        user: updatedUser
      });
    } catch (err) {
      handleError(res, err);
    }
  }

  // Get all patients
  static async getPatients(req, res) {
    try {
      const users = await UserService.getPatients();
      res.status(200).json({ success: true, status: "ok", users });
    } catch (err) {
      handleError(res, err);
    }
  }

  // Get all psychologists
  static async getPsychologists(req, res) {
    try {
      const users = await UserService.getPsychologists();
      res.status(200).json({ success: true, status: "ok", users });
    } catch (err) {
      handleError(res, err);
    }
  }
}

module.exports = UserController;
