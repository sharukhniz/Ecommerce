const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
    unique: true,
    // match: /^\S+@\S+\.\S+$/,
  },
  adminPassword: {
    type: String,
    required: true,
  },
});

const admins = new mongoose.model("admins", adminSchema);

module.exports = admins;
