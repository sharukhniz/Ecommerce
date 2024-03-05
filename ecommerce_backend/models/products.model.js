const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    // productImage: {
    //   type: [],
    //   required: true,
    // },
  productTitle: {
    type: String,
    // required: true,
  },
  productName: {
    type: String,
    // required: true,
  },
  productFeatures: {
    type: String,
    // required: true,
  },
  productDescription: {
    type: String,
    // required: true,
  },
  productPrice: {
    type: Number,
    // required: true,
  },
  productCategory:{
    type:String,
    // required:true,
  }
});

const products = new mongoose.model("products", productSchema);
module.exports = products;
