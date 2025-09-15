const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error.message);
  }
};

module.exports = connectDB;
