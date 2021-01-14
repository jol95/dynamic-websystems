const express = require('express');
const router = express.Router();

var managerController = require("./assets/manager.controller.js")

router.route('/') // GET all different managers. (for simulator)
    .get(managerController.getManagers);

router.route('/:email') // GET & UPDATE specific user
    .get(managerController.getManager)
    .put(managerController.updateManager)
    .patch(managerController.updateManager);

router.route('/login')  // Same functionality as user.login, small differences like houseid in payload for img. 
    .post(managerController.loginManager);
    
router.route('/register')   // Same functionality as user.register, small differences.
    .post(managerController.registerManager);

module.exports = router;