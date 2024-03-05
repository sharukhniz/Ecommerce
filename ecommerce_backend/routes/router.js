const express = require("express");
const router = express.Router();
const controller = require("../controller/category.controller");

router.get("/categories", controller.findCategory);
router.post("/categories", controller.postCategory);
router.put("/categories/:id", controller.editCategory);
router.delete("/categories/:id", controller.deleteCategory);

module.exports = router;