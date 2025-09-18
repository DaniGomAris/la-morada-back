const express = require("express");
const { loginController, logoutController } = require("./auth-controller");
const { validToken } = require("../../middlewares/jwt-middleware");

const router = express.Router();

// Login user
// POST /auth/login
router.post("/login", loginController);

// Logout user
// POST /auth/logout
router.post("/logout", validToken, logoutController);

module.exports = router;
