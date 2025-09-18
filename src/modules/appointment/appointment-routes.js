const express = require("express");
const router = express.Router();
const { authorizeRoles } = require("../../middlewares/role-middleware");
const { validToken } = require("../../middlewares/jwt-middleware");

const { 
  createAppointmentController,
  updateAppointmentController,
  deleteAppointmentController,
  getAppointmentsController
} = require("./appointment-controller");

// Create appointment
// POST appointment/
router.post("/", validToken, authorizeRoles(["patient", "psychologist"]), createAppointmentController);

// Editar appointment
// PUT appointment/:id
router.put("/:id", validToken, authorizeRoles(["patient", "psychologist"]), updateAppointmentController);

// Eliminar appoinment
// DELETE appointment/:id
router.delete("/:id", validToken, authorizeRoles(["patient", "psychologist"]), deleteAppointmentController);

// Obtener citas
// GET appointment/:id
router.get("/", validToken, authorizeRoles(["patient", "psychologist"]), getAppointmentsController);

module.exports = router;
