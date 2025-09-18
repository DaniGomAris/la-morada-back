const express = require("express");
const router = express.Router();
const {
  registerUserController,
  updateUserController,
  getPatientUsersController,
  getPsychologistUsersController
} = require("./user-controller");
const { validToken } = require("../../middlewares/jwt-middleware");
const { authorizeRoles } = require("../../middlewares/role-middleware");

// Obtener usuarios (rol patient)
// GET users/
router.get("/get-patients", validToken, authorizeRoles(["psychologist"]), getPatientUsersController);

// Obtener usuarios (rol psychologist)
// GET users/
router.get("/get-psychologists", getPsychologistUsersController);

// Registrar usuario
// POST users/register
router.post("/register", registerUserController);

// Editar usuario (psychologist)
// PUT users/:id
router.put("/:id", validToken, authorizeRoles(["psychologist", "patient"]), updateUserController);


module.exports = router;
