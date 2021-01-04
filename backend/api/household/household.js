const express = require('express');
const router = express.Router();

var householdController = require("./assets/household.controller.js")

router.route('/') 
    .get(householdController.getHouses)
    .post(householdController.addHouse);
    
router.route('/:houseid')
    .get(householdController.getHouse)
    .patch(householdController.updateHouse)
    .put(householdController.updateHouse);

module.exports = router;