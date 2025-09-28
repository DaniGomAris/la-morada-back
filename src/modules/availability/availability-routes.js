const express = require("express");
const router = express.Router();
const { authorizeRoles } = require("../../middlewares/role-middleware");
const { validToken } = require("../../middlewares/jwt-middleware");
const AvailabilityController = require("./availability-controller");

// Create or update availability (POST /availability/availabilities)
router.post("/", validToken, authorizeRoles(["psychologist"]), AvailabilityController.upsert);

// Get availability (GET /availability/availabilities)
router.get("/", validToken, authorizeRoles(["psychologist"]), AvailabilityController.get);

// Delete availability (DELETE /availability/:id)
router.delete("/:id", validToken, authorizeRoles(["psychologist"]), AvailabilityController.remove);

module.exports = router;
