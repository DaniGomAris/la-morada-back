const CartService = require("./cart-service");
const { handleError } = require("../../handlers/error-handler");
const { validateCartItem } = require("./validators/cart-validator");
const logger = require("../../utils/logger");

class CartController {
  static async addProduct(req, res) {
    try {
      const { product_id, quantity } = req.body;
      validateCartItem({ product_id, quantity });

      const user_id = req.user.user_id;
      const cart = await CartService.addProduct(user_id, product_id, quantity || 1);

      logger.info(`Product ${product_id} added to cart for user ${user_id}`);
      res.status(200).json({ success: true, cart });
    } catch (err) {
      logger.error(`CartController.addProduct: ${err.message}`);
      handleError(res, err);
    }
  }

  static async getCart(req, res) {
    try {
      const user_id = req.user.user_id;
      const cart = await CartService.getCart(user_id);

      logger.info(`Fetched cart for user ${user_id}`);
      res.status(200).json({ success: true, cart });
    } catch (err) {
      logger.error(`CartController.getCart: ${err.message}`);
      handleError(res, err);
    }
  }

  static async removeProduct(req, res) {
    try {
      const { product_id } = req.body;
      validateCartItem({ product_id });

      const user_id = req.user.user_id;
      const cart = await CartService.removeProduct(user_id, product_id);

      logger.info(`Product ${product_id} removed from cart for user ${user_id}`);
      res.status(200).json({ success: true, cart });
    } catch (err) {
      logger.error(`CartController.removeProduct: ${err.message}`);
      handleError(res, err);
    }
  }

  static async clearCart(req, res) {
    try {
      const user_id = req.user.user_id;
      const cart = await CartService.clearCart(user_id);

      logger.info(`Cart cleared for user ${user_id}`);
      res.status(200).json({ success: true, cart });
    } catch (err) {
      logger.error(`CartController.clearCart: ${err.message}`);
      handleError(res, err);
    }
  }
}

module.exports = CartController;
