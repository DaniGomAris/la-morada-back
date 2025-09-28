const express = require("express");
const router = express.Router();
const { validToken } = require("../../middlewares/jwt-middleware");
const { authorizeRoles } = require("../../middlewares/role-middleware");
const UserController = require("./user-controller");

// Create user (POST /user/register)
router.post("/register", UserController.register);

// Update user (PUT /user/:id)
router.put("/:id", validToken, authorizeRoles(["psychologist", "patient"]), UserController.update);

// Get all patients (GET /user/get-patients)
router.get("/get-patients", validToken, authorizeRoles(["psychologist"]), UserController.getPatients);

// Get all psychologists (GET /user/get-psychologists)
router.get("/get-psychologists", UserController.getPsychologists);

// Get psychologist by especialty (GET /user/by-specialty)
router.get("/by-specialty", UserController.getPsychologistsBySpecialty);

// Delete own user (DELETE user/delete-me)
router.delete("/delete-me", validToken, authorizeRoles(["psychologist", "patient"]), UserController.deleteUser);
module.exports = router;
