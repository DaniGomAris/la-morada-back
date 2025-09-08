const express = require("express");
const UserController = require("../controllers/userControllers");
const { validateUserMiddleware } = require("../middlewares/userMiddleware");

const router = express.Router();

// Registro de usuario
// Validar los datos del usuario con el middleware
router.post("/register", validateUserMiddleware, UserController.register);

// Login de usuario
// Con email y password
router.post("/login", UserController.login);

// Obtener todos los usuarios (solo psychologist o admin)
router.get("/", UserController.getAll);

// Obtener todos los usuarios (no importa el rol)
router.get("/all", UserController.getAllUsers);


module.exports = router;
