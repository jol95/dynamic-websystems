const express = require('express');
const router = express.Router();

var userController = require("./assets/user.controller.js")

router.route('/login')  // POST for auth token.
    .post(userController.loginUser);
    
router.route('/register') // POST adding user to db.
    .post(userController.registerUser);

router.route('/:email') // UPDATE specific user based on email
    .put(userController.updateUser)
    .patch(userController.updateUser);

module.exports = router;