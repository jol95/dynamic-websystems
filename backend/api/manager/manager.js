const express = require('express');
const router = express.Router();

var managerController = require("./assets/manager.controller.js")

router.route('/:email')
    .get(managerController.getManager)
    .put(managerController.updateManager)
    .patch(managerController.updateManager);

router.route('/login')  // Same functionality as user.login, small differences like houseid in payload for img. 
    .post(managerController.loginManager);
    
router.route('/register')   // Same functionality as user.register, small differences.
    .post(managerController.registerManager);

module.exports = router;