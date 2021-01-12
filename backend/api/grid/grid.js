const express = require('express');
const router = express.Router();

var gridController = require("./assets/grid.controller.js")

router.route('/') 
    .get(gridController.getGrid)
    .post(gridController.createGrid)
    .patch(gridController.updateGrid)
    .put(gridController.updateGrid);

module.exports = router;