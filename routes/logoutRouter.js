const express = require('express');
const logoutRoute = express.Router();

logoutRoute.get("/logout", async (req,res)=>{
    req.session.userId = null;
    res.redirect("/login");
})

module.exports = logoutRoute;