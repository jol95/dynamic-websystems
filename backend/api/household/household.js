const express = require('express');
const router = express.Router();

var householdController = require("./assets/household.controller.js")

router.route('/') 
    .get(householdController.getHouses) // GET all household.
    .post(householdController.addHouse); // POST new household which isnt producing (constant).   
    
router.route('/:id')
    .get(householdController.getHouse) // GET household based on id. 
    .patch(householdController.updateHouse) // UPDATE all household parameters including specific ones. 
    .put(householdController.updateHouse); // UPDATE all household parameters including specific ones.

module.exports = router;