const ProductService = require("./product-service");
const { handleError } = require("../../handlers/error-handler");
const logger = require("../../utils/logger");

class ProductController {
  // Create product
  static async create(req, res) {
    try {
      const product = await ProductService.create(req.body);
      res.status(201).json({ success: true, product });
    } catch (err) {
      logger.error(`Failed to create product: ${err.message}`);
      handleError(res, err);
    }
  }

  // Get product by title
  static async getByTitle(req, res) {
    try {
      const products = await ProductService.getByTitle(req.query.title || "");
      res.status(200).json({ success: true, products });
    } catch (err) {
      logger.error(`Failed to get products by title: ${err.message}`);
      handleError(res, err);
    }
  }

  // Get all products
  static async getAll(req, res) {
    try {
      const products = await ProductService.getAll();
      res.status(200).json({ success: true, products });
    } catch (err) {
      logger.error(`Failed to get all products: ${err.message}`);
      handleError(res, err);
    }
  }
}

module.exports = ProductController;
