const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../../config/keys");
let User = require('./user.model');
let Household = require('./household.model');


exports.getUser = async function(req, res) {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email});
    console.log(data)
    // Check password
    bcrypt.compare(req.body.password, data.password).then(isMatch => {
        if (isMatch) {
            console.log("correct pw");
            const payload = {
                id: user.id,
                email: user.email
                };
        // User matched
        // Create JWT Payload

    // Sign token
    jwt.sign(
        payload,
        keys.secretOrKey,
        {
        expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
        res.json({
            success: true,
            token: "Bearer " + token
        });
        }
    );
    } else {
    return res
        .status(400)
        .json({ passwordincorrect: "Password incorrect" });
    }
    });
    //
}

exports.registerUser = function(req, res) {
    const houseid = new mongoose.mongo.ObjectId();

    const email = req.body.email;
    const password = "";
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const address = req.body.address;

    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
            password = hash;
        });
    });

    const newUser = new User({
        email,
        password,
        houseid,
        firstname,  
        lastname,
        address
    });


    newUser.save();

    const wind = 0 
    const consumption = 0 
    const price = 0 
    const isproducing = true
    const production = 0  
    const netproduction = 0  
    const buffer = 0  
    const ratio = 0.5

    const newHousehold = new Household({
        houseid,
        address,
        wind,
        consumption,
        price,
        isproducing,
        production,
        netproduction,
        buffer,
        ratio,
    });

    newHousehold.save()
        .then(() => res.json('User and household added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}
