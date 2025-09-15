const express = require("express");
const { loginController } = require("./auth-controller");

const router = express.Router();

// POST /auth/login
router.post("/login", loginController);

module.exports = router;
