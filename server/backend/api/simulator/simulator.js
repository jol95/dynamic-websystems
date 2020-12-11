const simulator = require('express').Router();

var simulatorController = require('./simulator.controller.js')

simulator.route('/')
	.get(simulatorController.index)
    .post(simulatorController.add);

simulator.route('/sim_id')
    .get(simulatorController.view)
    .patch(simulatorController.update)
    .put(simulatorController.update)
    .delete(simulatorController.delete);

module.exports = simulator;
