const asyncHandler = require("express-async-handler");
const categoryService = require("../services/categoryServices");

exports.getCategory = asyncHandler(async (req, res) => {
  const { categories, totalCount } = await categoryService.getCategory();
  res.status(200).json({ categories, totalCount });
});

exports.postCategory = asyncHandler(async (req, res) => {
  const createdCategory = await categoryService.createCategory(req.body);
  res.status(201).json(createdCategory);
});

exports.editCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedCategory = await categoryService.editCategory(id, req.body);
  if (!updatedCategory) {
    return res.status(404).json({ message: `Cannot find any Category with ID ${id}` });
  }
  res.status(200).json(updatedCategory);
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedCategory = await categoryService.deleteCategory(id);
  if (!deletedCategory) {
    return res.status(404).json({ message: `Cannot find any Category with ID ${id}` });
  }
  res.status(200).json(deletedCategory);
});