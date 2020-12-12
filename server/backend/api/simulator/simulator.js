const router = require('express').Router();
Simulator = require('./simulator.model.js');

router.route('/').get((req, res) => {
    Simulator.find()
      .then(simulator => res.json(simulator))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const production = Number(req.body.production);
    const consumption = Number(req.body.consumption);
    const wind = Number(req.body.wind);
    const price = Number(req.body.price);

  
    const newSimulator = new Simulator({
      production,
      consumption,
      wind,
      price,
    });
  
    newSimulator.save()
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
        const production = Number(req.body.production);
        const consumption = Number(req.body.consumption);
        const wind = Number(req.body.wind);
        const price = Number(req.body.price);

        simulator.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router;
