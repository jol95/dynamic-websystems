const express = require('express');
const router = express.Router();

var managerController = require("./assets/manager.controller.js")

router.route('/') // GET all different managers. (for simulator)
    .get(managerController.getManagers);

router.route('/:id') // GET & UPDATE specific user
    .get(managerController.getManager)
    .patch(managerController.updateManager)
    .put(managerController.updateManager);


router.route('/login')  // Same functionality as user.login, small differences like houseid in payload for img. 
    .post(managerController.loginManager);
    
router.route('/register')   // Same functionality as user.register, small differences.
    .post(managerController.registerManager);

module.exports = router;