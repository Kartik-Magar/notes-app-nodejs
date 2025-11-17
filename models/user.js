const mongoose = require("mongoose");
const bcrypt = require("bcrypts");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("user", userSchema);
