const express = require('express');
const router = express.Router();

var userController = require("./assets/user.controller.js")

router.route('/login') 
    .post(userController.loginUser);
    
router.route('/register')
    .post(userController.registerUser);


module.exports = router;