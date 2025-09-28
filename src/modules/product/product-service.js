const ProductModel = require("./models/product");
const { validateProduct } = require("./validators/product-validator");
const logger = require("../../utils/logger");

class ProductService {
  // Crear producto
  static async create(data) {
    validateProduct(data);

    const existing = await ProductModel.findOne({ title: data.title });
    if (existing) {
      logger.warn(`Product already exists: ${data.title}`);
      throw new Error("PRODUCT EXISTS");
    }

    const product = new ProductModel(data);
    await product.save();

    logger.info(`Product created: ${product.title}`);
    return product;
  }

  // Obtener productos por título
  static async getByTitle(title) {
    const regex = new RegExp(title, "i");
    const products = await ProductModel.find({ title: regex }).lean();
    return products;
  }

  // Obtener todos los productos
  static async getAll() {
    return await ProductModel.find().lean();
  }
}

module.exports = ProductService;
