const mongoose = require('mongoose');
const express = require("express");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../user/config/keys");

let Manager = require('./manager.model.js');

// Load input validation
const validateUpdateInput = require("./validation/update");
const validateRegisterInput = require("./validation/register");
const validateLoginInput = require("./validation/login");

exports.loginManager = async function(req, res) {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
  
    // Find manager by email
    Manager.findOne({ email }).then(manager => {
      // Check if manager exists
      if (!manager) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }

      // Check password
      bcrypt.compare(password, manager.password).then(isMatch => {
        if (isMatch) {
          // manager matched
          // Create JWT Payload
          const payload = {
            email: manager.email
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
    Manager.findOne({ email: req.body.email }).then(manager => {
        if (manager) {
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
          bcrypt.hash(newManager.password, salt, (err, hash) => {
            if (err) throw err;
            newManager.password = hash;
            newManager
              .save()
              .then(manager => res.json(manager))
              .catch(err => console.log(err));
          });
        });
      }
    });
}

exports.getManager = async function(req, res) {
  const { errors, isValid } = validateUpdateInput(req.params);
  // Check validation
  if (!isValid) {
     return res.status(400).json(errors);
  }

  Manager.findOne({ email: req.params.email}, function (err, manager) {
      if (err){
          console.log(err);
      }
      else{
          res.json(manager);
      }
  });
};

exports.getManagers = async function(req, res) {
  Manager.find(function (err, manager) {
      if (err){
          console.log(err);
      }
      else{
          res.json(manager);
      }
  });
}

exports.updateManager = async function(req, res) {
  // Form validation
  const { errors, isValid } = validateUpdateInput(req.params);
  // Check validation
  if (!isValid) {
     return res.status(400).json(errors);
  }

  Manager.findOne({ email: req.params.email }).then(manager => {
    if (!manager) {
        return res.status(400).json({ email: "Email doesn't exist" });
    } else {
        manager.firstname = req.body.firstname? req.body.firstname: manager.firstname,
        manager.lastname = req.body.lastname? req.body.lastname: manager.lastname,
        manager.production = req.body.production? req.body.production: manager.production,
        manager.buffer = req.body.buffer? req.body.buffer: manager.buffer,
        manager.status = req.body.status? req.body.status: manager.status,
        manager.address = req.body.address? req.body.address: manager.address

        manager
          .save()
          .then(manager => res.json(user))
          .catch(err => console.log(err));
    }
  });
}