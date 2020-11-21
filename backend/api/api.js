// Simulator.js

let simulator = require('express').Router();

simulator.get('/', function(req, res) {
	    res.json({
		            status: 'API Works',
		            message: 'Welcome to FirstRest API'
		        });
});

var simulatorController = require('./simulator/simulatorController.js')

// Sim routes

simulator.route('/simulator')
	.get(simulatorController.index)
    .post(simulatorController.add);

simulator.route('/simulator/:sim_id')
    .get(simulatorController.view)
    .patch(simulatorController.update)
    .put(simulatorController.update)
    .delete(simulatorController.delete);

module.exports = simulator;
