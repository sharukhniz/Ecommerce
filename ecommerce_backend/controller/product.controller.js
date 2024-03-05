const asyncHandler = require("express-async-handler");
const productService = require("../services/productServices.js");

exports.getProduct = asyncHandler(async (req, res) => {
  const { products, totalCount } = await productService.getProduct();
  res.status(200).json({ products, totalCount });
});

exports.postProduct = asyncHandler(async (req, res) => {
  const createdProduct = await productService.createProduct(req.body);
  res.status(201).json(createdProduct);
});

exports.editProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await productService.editProduct(id, req.body);
  if (!updatedProduct) {
    return res.status(404).json({ message: `Cannot find any Product with ID ${id}` });
  }
  res.status(200).json(updatedProduct);
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await productService.deleteProduct(id);
  if (!deletedProduct) {
    return res.status(404).json({ message: `Cannot find any Product with ID ${id}` });
  }
  res.status(200).json(deletedProduct);
});