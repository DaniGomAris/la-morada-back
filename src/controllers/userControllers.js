const UserService = require("../services/userService");

class UserController {
  static async register(req, res) {
    try {
      const result = await UserService.registerUser(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const result = await UserService.login(req.body.email, req.body.password);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const users = await UserService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
