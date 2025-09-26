const mongoose = require("mongoose");
const logger = require("../utils/logger");

// Connect to MongoDB will using Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME,
    });
    logger.info("Connected to MondoDB");
  } catch (error) {
    logger.error("Error conectando a MongoDB:", err);
    process.exit(1)
  }
};

module.exports = connectDB;
