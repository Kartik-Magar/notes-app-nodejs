const express = require("express");
const path = require("path");
const bcrypt = require("bcrypts");
const rootDir = require("../utils/pathUtils");
const User = require("../models/user");

const registerRoute = express.Router();

registerRoute.get("/register", async (req, res) => {
  res.render("register");
});
registerRoute.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.send("Usernsme already exist ");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    console.log(user);
    await user.save();
    return res.redirect("/login");
  } catch (err) {
    console.log("Error saving user to database:", err);
    res
      .status(500)
      .send("An error occurred while registering. Please try again.");
  }
});

module.exports = registerRoute;
