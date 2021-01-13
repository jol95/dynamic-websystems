const express = require('express');
const router = express.Router();

var managerController = require("./assets/manager.controller.js")

router.route('/')
    .get(getManager)
    .put(updateManager)
    .patch(managerController.updateManager);

router.route('/login') 
    .post(managerController.loginManager);
    
router.route('/register')
    .post(managerController.registerManager);

router.route('/')

module.exports = router;