const mongoose = require('mongoose');
const express = require("express");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../user/config/keys");

let Manager = require('./assets/manager.model.js');

// Load input validation
const validateRegisterInput = require("../../user/assets/validation/register");
const validateLoginInput = require("../../user/assets/validation/login");

exports.loginManager = async function(req, res) {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
  
    // Find user by email
    Manager.findOne({ email }).then(user => {
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
            email: user.email
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

exports.registerManager = async function(req, res) {
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
            const newManager = new Manager({
                email: req.body.email,
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                production: 0,
                buffer: 10,
                status: "off",
                img: ""

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
}