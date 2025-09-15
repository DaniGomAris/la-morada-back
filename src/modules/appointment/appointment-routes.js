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

// POST appointment/
router.post("/", authenticateJWT, authorizeRoles(["patient", "psychologist"]), createAppointmentController);

// PUT appointment/:id
router.put("/:id", authenticateJWT, authorizeRoles(["patient", "psychologist"]), updateAppointmentController);

// DELETE appointment/:id
router.delete("/:id", authenticateJWT, authorizeRoles(["patient", "psychologist"]), deleteAppointmentController);

// GET appointment/:id
router.get("/", authenticateJWT, authorizeRoles(["patient", "psychologist"]), getAppointmentsController);

module.exports = router;
