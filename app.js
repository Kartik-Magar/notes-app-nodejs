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

const uri =
  "mongodb+srv://root:root@completecoding.kqe40.mongodb.net/notesdb?retryWrites=true&w=majority";

// MONGO CONNECTION
mongoose
  .connect(uri, {})
  .then(() => console.log("MongoDb is connected successfully"))
  .catch((err) => console.log(err));

// VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "IMPpassword",
    resave: false,
    saveUninitialized: true,
  })
);

// ✅ ADD THIS HOME ROUTE HERE
app.get("/", (req, res) => {
  return res.redirect("/login"); // or /register or /notes
});

// ROUTES
app.use(logoutRoute);
app.use(registerRouter);
app.use(loginRouter);
app.use(noteRoute);

// SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
