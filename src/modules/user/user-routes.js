const express = require("express");
const router = express.Router();

const {
  registerUserController,
  updateUserController,
  getUsersController
} = require("./user-controller");

const { authenticateJWT } = require("../../middlewares/jwt-middleware");
const { authorizeRoles } = require("../../middlewares/role-middleware");

// POST users/register
router.post("/register", registerUserController);

// GET users/
router.get("/", authenticateJWT, authorizeRoles(["psychologist"]), getUsersController);

// PUT users/:id
router.put("/:id", authenticateJWT, authorizeRoles(["psychologist", "admin"]), updateUserController);


module.exports = router;
