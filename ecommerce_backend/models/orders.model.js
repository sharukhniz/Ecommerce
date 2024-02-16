const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  orderUser: {
    type: String,
    require: true,
  },
  orderProduct: {
    type: String,
    require: true,
  },
});

const orders = new mongoose.model("orders", ordersSchema);

module.exports = orders;
