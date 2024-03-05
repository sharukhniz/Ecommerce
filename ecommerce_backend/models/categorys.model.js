const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
});

const categorys = new mongoose.model("categorys", categorySchema);

module.exports = categorys;
