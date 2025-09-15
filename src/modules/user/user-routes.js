const express = require("express");
const router = express.Router();

const { registerUserController } = require("./user-controller");
const { getUsersController } = require("./user-controller");

const { authenticateJWT } = require("../../middlewares/jwt-middleware");
const { authorizeRoles } = require("../../middlewares/role-middleware");

// Solo admin
router.post("/register", registerUserController);

// Listar usuarios (solo admin)
router.get("/", authenticateJWT, authorizeRoles(["admin"]), getUsersController);

module.exports = router;
