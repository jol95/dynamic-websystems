// router.js

let router = require('express').Router();

router.get('/', function(req, res) {
	    res.json({
		            status: 'API Works',
		            message: 'Welcome to FirstRest API'
		        });
});

var simController = require('./simulator/simulatorController.js')

// Sim routes

router.route('/sim')
	.get(simController.index)
    .post(simController.add);

router.route('/sim/:sim_id')
    .get(simController.view)
    .patch(simController.update)
    .put(simController.update)
    .delete(simController.update);

module.exports = router;
