const express = require("express");
const router = express.Router();
const { validToken } = require("../../middlewares/jwt-middleware");
const { authorizeRoles } = require("../../middlewares/role-middleware");
const UserController = require("./user-controller");

// Create user (POST /users/register)
router.post("/register", UserController.register);

// Update user (PUT /users/:id)
router.put("/:id", validToken, authorizeRoles(["psychologist", "patient"]), UserController.update);

// Get all patients (GET /users/get-patients)
router.get("/get-patients", validToken, authorizeRoles(["psychologist"]), UserController.getPatients);

// Get all psychologists (GET /users/get-psychologists)
router.get("/get-psychologists", UserController.getPsychologists);

module.exports = router;
