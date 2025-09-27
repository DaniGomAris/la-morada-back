const express = require("express");
const { validToken } = require("../../middlewares/jwt-middleware");
const { authorizeRoles } = require("../../middlewares/role-middleware");
const ProductController = require("./product-controller");

const router = express.Router();

// Create product (POST /)
router.post("/", validToken, authorizeRoles(["psychologist"]), ProductController.create);

// Get products by title (GET /products?title=)
router.get("/", ProductController.getByTitle);

// Get all products (GET /all)
router.get("/all", ProductController.getAll);

module.exports = router;
