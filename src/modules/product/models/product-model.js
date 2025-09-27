const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true }, 
    author: { type: String, required: true },              
    publish_year: { type: Number, required: true },      
    price: { type: Number, required: true },              
    cover_url: { type: String, required: true }           
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
