const express = require('express');
const router = express.Router();

var userController = require("./assets/user.controller.js")

router.route('/login') 
    .post(userController.loginUser);
    
router.route('/register')
    .post(userController.registerUser);

router.route('/')
    .put(userController.updateUser)
    .patch(userController.updateUser);

module.exports = router;