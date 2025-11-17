const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcryptjs");
const session = require("express-session");
// local module
const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");
const noteRoute = require("./routes/notesRouter");
const logoutRoute = require("./routes/logoutRouter");
// const initializePassword = require('./password-config');

const app = express();
const uri =
  "mongodb+srv://root:root@completecoding.kqe40.mongodb.net/notesdb?retryWrites=true&w=majority";

mongoose
  .connect(uri, {})
  .then(() => {
    console.log("MogoDb is connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "IMPpassword",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(logoutRoute);
app.use(registerRouter);
app.use(loginRouter);
app.use(noteRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(
    `Server is running on the address http://localhost:${PORT}/register`
  );
});

app.get("/", (req, res) => {
  res.redirect("/login");
});
