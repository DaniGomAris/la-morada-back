const express = require("express");
const router = express.Router();

const {
  registerUserController,
  updateUserController,
  getUsersController
} = require("./user-controller");

const { authenticateJWT } = require("../../middlewares/jwt-middleware");
const { authorizeRoles } = require("../../middlewares/role-middleware");

// Registrar usuario
router.post("/register", registerUserController);

// Obtener usuarios (solo psychologist)
router.get("/", authenticateJWT, authorizeRoles(["psychologist"]), getUsersController);

// Aztualizar usuario
router.put("/:id", authenticateJWT, authorizeRoles(["psychologist", "admin"]), updateUserController);


module.exports = router;
