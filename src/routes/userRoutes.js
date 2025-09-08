const express = require("express");
const UserController = require("../controllers/userControllers");
const { validateUserMiddleware } = require("../middlewares/userMiddleware");

const router = express.Router();

router.post("/register", validateUserMiddleware, UserController.register);
router.post("/login", UserController.login);
router.get("/", UserController.getAll);

module.exports = router;
