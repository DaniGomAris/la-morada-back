const ProductModel = require("./models/product-model");
const { validateProduct } = require("./validators/product-validator");
const logger = require("../../utils/logger");

class ProductService {
  // Create product
  static async create(data) {
    validateProduct(data);

    const existing = await ProductModel.findOne({ title: data.title });
    if (existing) {
      logger.warn(`Product already exists: ${data.title}`);
      throw new Error("RESOURCE EXISTS");
    }

    const product = new ProductModel(data);
    await product.save();

    logger.info(`Product created: ${product.title}`);
    return product;
  }

  // Get products by title
  static async getByTitle(title) {
    const regex = new RegExp(title, "i");
    const products = await ProductModel.find({ title: regex }).lean();
    return products;
  }

  // Get all products
  static async getAll() {
    return await ProductModel.find().lean();
  }
}

module.exports = ProductService;
