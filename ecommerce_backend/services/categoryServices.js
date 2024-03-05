const Category = require("../models/categorys.model");

const getCategory = async () => {
  try {
    const categories = await Category.find();
    const totalCount = categories.length;
    return { categories, totalCount };
  } catch (error) {
    console.error("Error finding Category:", error);
    throw new Error("Internal server error finding Category");
  }
};

const createCategory = async (data) => {
  try {
    return await Category.create(data);
  } catch (error) {
    console.error("Error creating Category:", error);
    throw new Error("Internal server error creating Category");
  }
};

const editCategory = async (id, newData) => {
  try {
    const editedCategory = await Category.findByIdAndUpdate(id, newData);
    if (!editedCategory) {
      throw new Error(`Cannot find any Category with ID ${id}`);
    }
    const updatedCategory = await Category.findById(id);
    return updatedCategory;
  } catch (error) {
    console.error("Error editing Category:", error);
    throw new Error("Internal server error editing Category");
  }
};

const deleteCategory = async (id) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      throw new Error(`Cannot find any category with ID ${id}`);
    }
    return deletedCategory;
  } catch (error) {
    console.error("Error deleting Category:", error);
    throw new Error("Internal server error deleting Category");
  }
};

module.exports = {
  getCategory,
  createCategory,
  editCategory,
  deleteCategory,
};
