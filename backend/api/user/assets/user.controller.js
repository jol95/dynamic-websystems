const mongoose = require('mongoose');
const express = require("express");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const Validator = require("validator");
const isEmpty = require("is-empty");

let User = require('./user.model');
let Household = require('../../household/assets/household.model');

// Load input validation
const validateRegisterInput = require("./validation/register");
const validateLoginInput = require("./validation/login");
const validateUpdateInput = require("../../manager/assets/validation/update");

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
            id: user.id,
            firstname: user.firstname,
            role: user.role
          };
         // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 300 // 5 minutes
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer user " + token,
              });
            }
          );

          user.status = true;

          user.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
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
    id = mongoose.mongo.ObjectId();
    role = "user";
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
                id: id,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                role: role,
                status: false,
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
    const ratio = 0.5
    const buffer = 10
    const isproducing = true
    const blackout = false
    const img = ""

    const newHousehold = new Household({
        id,
        address,
        wind,
        production,
        consumption,
        netproduction,
        ratio,
        buffer,
        isproducing, 
        blackout,
        img
    });

    newHousehold.save()
        .then(() => res.json('User and household added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}

/* WORKING

    IN: http://130.240.200.62:3000/api/household/5ff320840093be7ddc72cb18

    OUT: 
    
    {
    "_id": "5ff320840093be7ddc72cb1a",
    "houseid": "5ff320840093be7ddc72cb18",
    "address": "ha123",
    "wind": 0,
    "consumption": 0,
    "price": 0,
    "isproducing": true,
    "production": 0,
    "netproduction": 0,
    "buffer": 0,
    "ratio": 0.5,
    "createdAt": "2021-01-04T14:04:52.406Z",
    "updatedAt": "2021-01-04T14:04:52.406Z",
    "__v": 0
}

*/
exports.getUser = function(req, res) {
  User.findOne({ id: req.params.id}, function (err, user) {
      if (err){
          console.log(err);
      }
      else{
          res.json(user);
      }
  });
};

exports.getUsers = function(req, res) {
  User.find(function (err, user) {
      if (err){
          console.log(err);
      }
      else{
          res.json(user);
      }
  });
}


exports.updateUser = async function(req, res) {
  // Form validation
  //    const { errors, isValid } = validateUpdateInput(req.params);
  // // Check validation
  // if (!isValid) {
  //    return res.status(400).json(errors);
  // }
  
 User.findOne({ id: req.params.id }).then(user => {
  if (!user) {
      return res.status(400).json({id: "Id doesn't exist" });
  } else {
      if(isEmpty(req.body.password)){
        user.password = user.password,
        user.firstname = req.body.firstname? req.body.firstname: user.firstname,
        user.lastname = req.body.lastname? req.body.lastname: user.lastname,
        user.address = req.body.address? req.body.address: user.address,
        user.status = req.body.status? req.body.status: user.status

        user
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      }else{
        user.password = req.body.password;
        user.firstname = req.body.firstname? req.body.firstname: user.firstname,
        user.lastname = req.body.lastname? req.body.lastname: user.lastname,
        user.address = req.body.address? req.body.address: user.address
        user.status = req.body.status? req.body.status: user.status

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
    }
  });

  /*
      TODO: Update address in household.
  */
}
