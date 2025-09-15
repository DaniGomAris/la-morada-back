const express = require("express");
const router = express.Router();
const { authorizeRoles } = require("../../middlewares/role-middleware");
const { authenticateJWT } = require("../../middlewares/jwt-middleware");

const { 
  createAppointmentController,
  updateAppointmentController,
  deleteAppointmentController,
  getAppointmentsController
} = require("./appointment-controller");

// Crear cita 
router.post("/", authenticateJWT, authorizeRoles(["patient", "psychologist"]), createAppointmentController);

// Editar cita 
router.put("/:id", authenticateJWT, authorizeRoles(["patient", "psychologist"]), updateAppointmentController);

// Eliminar cita
router.delete("/:id", authenticateJWT, authorizeRoles(["patient", "psychologist"]), deleteAppointmentController);

// Ver todas las citas
router.get("/", authenticateJWT, authorizeRoles(["patient", "psychologist"]), getAppointmentsController);

module.exports = router;
