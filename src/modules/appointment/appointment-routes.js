const express = require("express");
const { authorizeRoles } = require("../../middlewares/role-middleware");
const { validToken } = require("../../middlewares/jwt-middleware");
const AppointmentController = require("./appointment-controller");

const router = express.Router();

// Create appointment (POST /appointment/)
router.post("/", validToken, authorizeRoles(["patient", "psychologist"]), AppointmentController.create);

// Delete appointment (DELETE /appointment/:id)
router.delete("/:id", validToken, authorizeRoles(["patient", "psychologist"]), AppointmentController.remove);

// Get appointments (GET /appointment/)
router.get("/", validToken, authorizeRoles(["patient", "psychologist"]), AppointmentController.getAll);

// Update appointment status (PUT /appointment/:id/status)
router.put("/:id/status", validToken, authorizeRoles(["patient", "psychologist"]), AppointmentController.updateStatus);

module.exports = router;
