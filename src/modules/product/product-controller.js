const ProductService = require("./product-service");
const { handleError } = require("../../handlers/error-handler");
const logger = require("../../utils/logger");

class ProductController {
  // Crear producto
  static async create(req, res) {
    try {
      const product = await ProductService.create(req.body);
      res.status(201).json({ success: true, product });
    } catch (err) {
      logger.error(`ProductController.create: ${err.message}`);
      handleError(res, err);
    }
  }

  // Obtener productos por título
  static async getByTitle(req, res) {
    try {
      const products = await ProductService.getByTitle(req.query.title || "");
      res.status(200).json({ success: true, products });
    } catch (err) {
      logger.error(`ProductController.getByTitle: ${err.message}`);
      handleError(res, err);
    }
  }

  // Obtener todos los productos
  static async getAll(req, res) {
    try {
      const products = await ProductService.getAll();
      res.status(200).json({ success: true, products });
    } catch (err) {
      logger.error(`ProductController.getAll: ${err.message}`);
      handleError(res, err);
    }
  }
}

module.exports = ProductController;
