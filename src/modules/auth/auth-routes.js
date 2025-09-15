const express = require("express");
const { login } = require("../auth/auth-controller");

const router = express.Router();

// POST /users/login
router.post("/login", login);

module.exports = router;
