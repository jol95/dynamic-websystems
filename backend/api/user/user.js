const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys.js");

const validateRegisterInput = require("../../Validation/register");
const validateLoginInput = require("../../Validation/login");

var userController = require("./assets/user.controller.js")

router.route('/') 
    .post(userController.getUser);
    
router.route('/register')
    .post(userController.registerUser);

module.exports = router;