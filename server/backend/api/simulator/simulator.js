const router = require('express').Router();
Simulator = require('./simulator.model.js');

router.route('/').get((req, res) => {
    Simulator.find()
      .then(simulator => res.json(simulator))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    var sim = new Simulator

    sim.production = req.body.production;
    sim.consumption = req.body.consumption;
    sim.wind = req.body.wind;
    sim.price = req.body.price;
  
    sim.save()
    .then(() => res.json('Simulator added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Simulator.findById(req.params.id)
      .then(simulator => res.json(simulator))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Simulator.findByIdAndDelete(req.params.id)
      .then(() => res.json('Simulator deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Simulator.findById(req.params.id)
      .then(simulator => {
        const production = req.body.production;
        const consumption = req.body.consumption;
        const wind = req.body.wind;
        const price = req.body.price;

        simulator.save()
          .then(() => res.json('Simulator updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router;
