const Payment = require("./models/payment");
const User = require("../user/models/user");
const { validatePayment } = require("./validators/payment-validator");
const logger = require("../../utils/logger");

class PaymentService {

    // Create payment method
    static async createPayment(userId, data) {
        validatePayment(data);

        const payment = new Payment({ ...data, user_id: userId });
        await payment.save();

        // Vincular el método de pago al usuario
        const user = await User.findById(userId);
        if (!user) throw new Error("USER NOT FOUND");

        user.payment_id = payment._id;
        await user.save();

        logger.info(`Payment method created for user ${user.email}`);
        return payment;
    }

    // Get user payment methods 
    static async getPaymentsByUser(userId) {
        return await Payment.find({ user_id: userId }).lean();
    }

    // Delete payment method
    static async deletePayment(userId, paymentId) {
    const payment = await Payment.findById(paymentId);
    if (!payment) throw new Error("PAYMENT NOT FOUND");

    if (payment.user_id.toString() !== userId) {
      throw new Error("ACCESS DENIED");
    }

    await payment.deleteOne();

    const user = await User.findById(userId);
    if (user.payment_id?.toString() === paymentId) {
      user.payment_id = undefined;
      await user.save();
    }

    logger.info(`Payment method ${paymentId} deleted for user ${user.email}`);
    return payment;
  }
}

module.exports = PaymentService;
