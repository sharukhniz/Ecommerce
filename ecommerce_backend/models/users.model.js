const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
    // match: /^\S+@\S+\.\S+$/,
  },
});

const users = new mongoose.model("users", userSchema);

module.exports = users;
