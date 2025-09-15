const express = require("express");
const router = express.Router();

const { 
  createAppointmentController,
  updateAppointmentController,
  deleteAppointmentController,
  getAppointmentsController
} = require("./appointment-controller");

const { authenticateJWT } = require("../../middlewares/jwt-middleware");
const { authorizeRoles } = require("../../middlewares/role-middleware");

// Crear cita 
router.post("/", authenticateJWT, authorizeRoles(["user", "admin"]), createAppointmentController);

// Editar cita 
router.put("/:id", authenticateJWT, authorizeRoles(["user", "admin"]), updateAppointmentController);

// Eliminar cita
router.delete("/:id", authenticateJWT, authorizeRoles(["user", "admin"]), deleteAppointmentController);

// Ver todas las citas
router.get("/", authenticateJWT, authorizeRoles(["user", "admin"]), getAppointmentsController);

module.exports = router;
