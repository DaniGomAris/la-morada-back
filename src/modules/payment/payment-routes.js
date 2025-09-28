const express = require("express");
const router = express.Router();
const PaymentController = require("./payment-controller");
const { validToken } = require("../../middlewares/jwt-middleware");

// Create payment method (POST /payment/)
router.post("/", validToken, PaymentController.create);

// Get user payment methods (GET /payment/)
router.get("/", validToken, PaymentController.getUserPayments);

// Delete payment method (DELETE /payment/:paymentId)
router.delete("/:paymentId", validToken, PaymentController.delete);

module.exports = router;
