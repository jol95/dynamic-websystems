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
	.get(simController.index)
    .post(simController.add);

simulator.route('/api/:sim_id')
    .get(simController.view)
    .patch(simController.update)
    .put(simController.update)
    .delete(simController.delete);

module.exports = simulator;
