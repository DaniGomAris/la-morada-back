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

// Edit appointment
// PUT appointment/:id
router.put("/:id", validToken, authorizeRoles(["patient", "psychologist"]), updateAppointmentController);

// Delete appointment
// DELETE appointment/:id
router.delete("/:id", validToken, authorizeRoles(["patient", "psychologist"]), deleteAppointmentController);

// Get appointment
// GET appointment/:id
router.get("/", validToken, authorizeRoles(["patient", "psychologist"]), getAppointmentsController);

module.exports = router;
