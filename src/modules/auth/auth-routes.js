const express = require("express");
const AuthController = require("./auth-controller");
const { validToken } = require("../../middlewares/jwt-middleware");
const { loginLimiter } = require("../../middlewares/rate-limit-middleware");

const router = express.Router();

// Login (POST /auth/login)
router.post("/login", loginLimiter, AuthController.login);

// Logout (POST /auth/logout)
router.post("/logout", validToken, AuthController.logout);

module.exports = router;
