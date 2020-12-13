const express = require('express');
const router = express.Router();

var simulatorController = require("./assets/simulator.controller.js")

router.route('/simulator') 
    .get(simulatorController.getHouses)
    .post(simulatorController.addHouse);
    
router.route('/simulator/:houseid')
    .get(simulatorController.getHouse)
    .patch(simulatorController.updateHouse)
    .put(simulatorController.updateHouse);

module.exports = router;