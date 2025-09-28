const PaymentService = require("./payment-service");
const { handleError } = require("../../handlers/error-handler");
const logger = require("../../utils/logger");

class PaymentController {

    // Create payment method
    static async create(req, res) {
        try {
        const payment = await PaymentService.createPayment(req.user.user_id, req.body);
        res.status(201).json({ success: true, payment });
        } catch (err) {
        logger.error(`PaymentController.create: ${err.message}`);
        handleError(res, err);
        }
    }

    // Get user payment methods
    static async getUserPayments(req, res) {
        try {
        const payments = await PaymentService.getPaymentsByUser(req.user.user_id);
        res.status(200).json({ success: true, payments });
        } catch (err) {
        logger.error(`PaymentController.getUserPayments: ${err.message}`);
        handleError(res, err);
        }
    }

    static async delete(req, res) {
        try {
        const { paymentId } = req.params;
        const deletedPayment = await PaymentService.deletePayment(req.user.user_id, paymentId);
        res.status(200).json({ success: true, deletedPayment });
        } catch (err) {
        logger.error(`PaymentController.delete: ${err.message}`);
        handleError(res, err);
        }
    }
}

module.exports = PaymentController;
