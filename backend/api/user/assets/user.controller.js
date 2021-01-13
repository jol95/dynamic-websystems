const mongoose = require('mongoose');
const express = require("express");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

let User = require('./user.model');
let Household = require('../../household/assets/household.model');

// Load input validation
const validateRegisterInput = require("./validation/register");
const validateLoginInput = require("./validation/login");
const validateUpdateInput = require("./validation/update");

/*  WORKING

    IN:
    {
    "email": "a@a.com",
    "password": "abc123"
    }


    OUT:
    {
    "success": true,
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZjMyMDg0MDA5M2JlN2RkYzcyY2IxOSIsImVtYWlsIjoiYUBhLmNvbSIsImlhdCI6MTYwOTc2OTE1NSwiZXhwIjoxNjA5NzcwOTU1fQ.2nSmC0oGKE9jWs4Mw2aQYE5QGy10va4fmDPwcdMOuN8"
    }
*/
exports.loginUser = async function(req, res) {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
  
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }

      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            email: user.email,
            houseid: user.houseid
          };
         // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 300 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer1 " + token,
                email: email
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
}

/*  WORKING

    IN:
    {
    "email": "a@a.com",
    "password": "abc123",
    "firstname": "dsa",
    "lastname": "war",
    "address": "ha123"
    }

    OUT: 
    "User and household added!"
*/
exports.registerUser = async function(req, res) {
    houseid = mongoose.mongo.ObjectId();
    address = req.body.address;

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
       return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                houseid: houseid,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: address
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });

    const wind = 0 
    const production = 0  
    const consumption = 0 
    const netproduction = 0  
    const price = 0 
    const ratio = 0.5
    const buffer = 10
    const isproducing = true
    const blackout = false

    const newHousehold = new Household({
        houseid,
        address,
        wind,
        production,
        consumption,
        netproduction,
        price,
        ratio,
        buffer,
        isproducing, 
        blackout
    });

    newHousehold.save()
        .then(() => res.json('User and household added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateUser = function(req, res) {
  // Form validation
  const { errors, isValid } = validateUpdateInput(req.body);
  // Check validation
  if (!isValid) {
     return res.status(400).json(errors);
  }

 User.findOne({ email: req.body.email }).then(user => {
  if (!user) {
      return res.status(400).json({ email: "Email doesn't exist" });
  } else {
      user.password = req.body.password? req.body.password: user.password,
      user.firstname = req.body.firstname? req.body.firstname: user.firstname,
      user.lastname = req.body.lastname? req.body.lastname: user.lastname,
      user.address = req.body.address? req.body.address: user.address

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        user
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
        });
      });
}
});
}
