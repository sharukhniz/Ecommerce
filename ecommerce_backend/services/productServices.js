const Product = require("../models/products.model");

const getProduct = async () => {
  try {
    const products = await Product.find();
    const totalCount = products.length;
    return { products, totalCount };
  } catch (error) {
    console.error("Error finding Product:", error);
    throw new Error("Internal server error finding Product");
  }
};

const createProduct = async (data) => {
  try {
    return await Product.create(data);
  } catch (error) {
    console.error("Error creating Product:", error);
    throw new Error("Internal server error creating Product");
  }
};

const editProduct = async (id, newData) => {
  try {
    const editedProduct = await Product.findByIdAndUpdate(id, newData);
    if (!editedProduct) {
      throw new Error(`Cannot find any Product with ID ${id}`);
    }
    const updatedProduct = await Product.findById(id);
    return updatedProduct;
  } catch (error) {
    console.error("Error editing Product:", error);
    throw new Error("Internal server error editing Product");
  }
};

const deleteProduct = async (id) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new Error(`Cannot find any Product with ID ${id}`);
    }
    return deletedProduct;
  } catch (error) {
    console.error("Error deleting Product:", error);
    throw new Error("Internal server error deleting Product");
  }
};

module.exports = {
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
