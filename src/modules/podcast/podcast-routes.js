const express = require("express");
const router = express.Router();
const PodcastController = require("./podcast-controller");
const { validToken } = require("../../middlewares/jwt-middleware");
const { authorizeRoles } = require("../../middlewares/role-middleware");

// Crate podcast (POST /)
router.post("/", validToken, authorizeRoles(["psychologist"]), PodcastController.create);

// GET docasts (GET /)
router.get("/", PodcastController.getAll);

module.exports = router;
