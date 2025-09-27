const express = require("express");
const router = express.Router();
const { authorizeRoles } = require("../../middlewares/role-middleware");
const { validToken } = require("../../middlewares/jwt-middleware");
const AvailabilityController = require("./availability-controller");

// Create or update availability (POST /availabilities)
router.post("/", validToken, authorizeRoles(["psychologist"]), AvailabilityController.upsert);

// Get availability (GET /availabilities)
router.get("/", validToken, authorizeRoles(["psychologist"]), AvailabilityController.get);

// Delete availability (DELETE /availabilities/:id)
router.delete("/:id", validToken, authorizeRoles(["psychologist"]), AvailabilityController.delete);

module.exports = router;
