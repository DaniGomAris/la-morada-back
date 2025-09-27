const Cart = require("./models/cart");
const Product = require("../product/models/product");
const logger = require("../../utils/logger");

class CartService {
  // Recalcular el total del carrito
  static async calculateTotal(cart) {
    let total = 0;
    for (const item of cart.products_id) {
      const product = await Product.findById(item.product_id);
      if (product) total += product.price * item.quantity;
    }
    cart.total = total;
  }

  // Add product to cart
  static async addProduct(user_id, product_id, quantity = 1) {
    try {
      const product = await Product.findById(product_id);
      if (!product) throw new Error("PRODUCT NOT FOUND");

      let cart = await Cart.findOne({ user_id });

      if (!cart) {
        cart = new Cart({ user_id, products_id: [{ product_id, quantity }], total: product.price * quantity });
      } else {
        const index = cart.products_id.findIndex(p => p.product_id.toString() === product_id);
        if (index > -1) {
          cart.products_id[index].quantity += quantity;
        } else {
          cart.products_id.push({ product_id, quantity });
        }
        await this.calculateTotal(cart); // recalcular total
      }

      await cart.save();
      logger.info(`Cart updated for user ${user_id}`);
      return cart;
    } catch (err) {
      logger.error(`CartService.addProduct: ${err.message}`);
      throw err;
    }
  }

  // Get cart by user
  static async getCart(user_id) {
    const cart = await Cart.findOne({ user_id }).populate("products_id.product_id");
    if (cart) await this.calculateTotal(cart);
    return cart || { user_id, products_id: [], total: 0 };
  }

  // Remove product from cart
  static async removeProduct(user_id, product_id) {
    const cart = await Cart.findOne({ user_id });
    if (!cart) throw new Error("CART NOT FOUND");

    cart.products_id = cart.products_id.filter(p => p.product_id.toString() !== product_id);
    await this.calculateTotal(cart); // recalcular total
    await cart.save();
    logger.info(`Product removed from cart for user ${user_id}`);
    return cart;
  }

  // Clear cart
  static async clearCart(user_id) {
    const cart = await Cart.findOne({ user_id });
    if (!cart) throw new Error("CART NOT FOUND");

    cart.products_id = [];
    cart.total = 0;
    await cart.save();
    logger.info(`Cart cleared for user ${user_id}`);
    return cart;
  }
}

module.exports = CartService;
