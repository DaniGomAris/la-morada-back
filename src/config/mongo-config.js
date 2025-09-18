const mongoose = require("mongoose");
const logger = require("../utils/logger");

MONGO_URL = process.env.MONGO_URL

// Conecta a MongoDB usando Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME,
    });
    logger.info("Connected to MondoDB");
  } catch (error) {
    logger.error("Error conectando a MongoDB:", err);
  }
};

module.exports = connectDB;
