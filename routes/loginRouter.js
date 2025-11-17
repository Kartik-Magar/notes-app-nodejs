const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const loginRoute = express.Router();

// Show login page
loginRoute.get("/login", (req, res) => {
  console.log("Login page trigger");
  res.render("login");
});

// Handle login
loginRoute.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("❌ User not found!");
    }

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("❌ Incorrect password!");
    }

    // Store user session
    req.session.userId = user._id;
    console.log("✅ User logged in:", user.username);

    // Redirect to notes page
    res.redirect("/notes");
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).send("Error: Something went wrong");
  }
});

module.exports = loginRoute;
