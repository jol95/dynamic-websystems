// Simulator.js

let simulator = require('express').Router();

simulator.get('/', function(req, res) {
	    res.json({
		            status: 'API Works',
		            message: 'Welcome to FirstRest API'
		        });
});

var simulatorController = require('./api/simulatorController.js')

// Sim routes

simulator.route('/api')
	.get(simulatorController.index)
    .post(simulatorController.add);

simulator.route('/api/:sim_id')
    .get(simulatorController.view)
    .patch(simulatorController.update)
    .put(simulatorController.update)
    .delete(simulatorController.delete);

module.exports = simulator;
