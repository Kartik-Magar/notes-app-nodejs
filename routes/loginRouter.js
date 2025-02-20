const express = require('express');
const User = require('../models/user');

const path = require('path');
const rootDir = require("../utils/pathUtils");

const loginRoute = express.Router();

loginRoute.get("/login",(req,res)=>{
    console.log("Login page trigger");
    res.render('login');
})

loginRoute.post('/login',async(req,res)=>{
      try{
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if(!user){
            res.status(400).send("User not Found!!")
        }

        if(user.password!==password){
            return res.status(400).send("Incorrect Passward!!");
        }

        req.session.userId = user._id

        res.redirect('/notes');
      } catch(err){
        console.log(err);
        res.status(500).send("Error Some thing is wrong");
      }
})

module.exports = loginRoute;