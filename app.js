require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcryptjs");
const session = require("express-session");

// local modules
const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");
const noteRoute = require("./routes/notesRouter");
const logoutRoute = require("./routes/logoutRouter");

const app = express();

// Mongo URI from .env
const uri = process.env.MONGODB_URI;

// MONGO CONNECTION
mongoose
  .connect(uri)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.log("Mongo error:", err));

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// static folder (optional)
app.use(express.static(path.join(__dirname, "public")));

// home route
app.get("/", (req, res) => {
  res.redirect("/login");
});

// routes
app.use(logoutRoute);
app.use(registerRouter);
app.use(loginRouter);
app.use(noteRoute);

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));
