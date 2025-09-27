const express = require("express");
const { validToken } = require("../../middlewares/jwt-middleware");
const CartController = require("./cart-controller");

const router = express.Router();

// Add cart (POST /add)
router.post("/add", validToken, CartController.addProduct);

// Obtener carrito (GET /)
router.get("/", validToken, CartController.getCart);

// Delete cart product (POST /remove)
router.post("/remove", validToken, CartController.removeProduct);

// Empty cart (POST  /clear)
router.post("/clear", validToken, CartController.clearCart);

module.exports = router;
