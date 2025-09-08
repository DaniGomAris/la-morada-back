const UserService = require("../services/userService");

class UserController {

  // Validacion de rol
  static checkRole(role, res, requiredRole) {
    if (role !== requiredRole) {
      res.status(403).json({ error: `Acceso denegado: se requiere rol ${requiredRole}` });
      return false;
    }
    return true;
  }

  // Registrar un nuevo usuario (solo psychologist o admin)
  static async register(req, res) {
    try {
      const { role } = req.body; // Se asume que el rol del usuario que hace la petición viene en el body

      // Valida que el rol sea psychologist o admin
      if (role !== "psychologist" && role !== "admin") {
        return res.status(403).json({ error: "Acceso denegado: solo psychologist o admin" });
      }

      const result = await UserService.registerUser(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Iniciar sesion
  static async login(req, res) {
    try {
      const result = await UserService.login(req.body.email, req.body.password);

      // Devuelve la info del usuario, incluido el rol para poder acceder a las rutas
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  // Obtener todos los usuarios segun el rol
  static async getAll(req, res) {
    try {
      const { role } = req.body;

      // Obtiene el rol para la consulta
      let targetRole;
      if (role === "psychologist") {
        targetRole = "patient"; // psychologist ve todos los pacientes
      } else if (role === "admin") {
        targetRole = "psychologist"; // admin ve todos los psychologist
      } else {
        return res.status(403).json({ error: "Acceso denegado: rol no permitido" });
      }

      const users = await UserService.getUsersByRole(targetRole);
      res.status(200).json(users);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener todos los usuarios sin filtrar por rol (acceso libre o admin según tu decisión)
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getUsers(); // Obtiene todos los usuarios
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = UserController;
