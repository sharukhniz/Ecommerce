const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category.controller");
const productController = require("../controller/product.controller");

router.get("/categories", categoryController.getCategory);
router.post("/categories", categoryController.postCategory);
router.put("/categories/:id", categoryController.editCategory);
router.delete("/categories/:id", categoryController.deleteCategory);

router.get("/products", productController.getProduct);
router.post("/products", productController.postProduct);
router.put("/products/:id", productController.editProduct);
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
