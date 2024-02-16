const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productImage: {
    type: String,
    required: true,
  },
  productTitle: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productBrand: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
});

const products = new mongoose.model("products", productSchema);
module.exports = products;
