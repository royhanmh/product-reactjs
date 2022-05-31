const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productCategory: { type: String },
  productRemaining: { type: Number },
  productPrice: { type: Number, required: true },
});

const Product = mongoose.model("Data", ProductSchema);
module.exports = Product;
