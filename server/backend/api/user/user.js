const router = require('express').Router();
const mongoose = require('mongoose');
let User = require('./user.model');
let Prosumer = require('./prosumer.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
    const houseid = new mongoose.mongo.ObjectId()

    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const address = req.body.address;

    const newUser = new User({
        username,
        password,
        firstname,  
        lastname,
        houseid,
        address
      });

    newUser.save()

    const currentwind = 0 
    const currentproduction = 0  
    const netproduction = 0  
    const buffer = 0  
    const price = 0 

    const newProsumer = new Prosumer({
        houseid,
        address,
        currentwind,
        currentproduction,
        netproduction,
        buffer,
        price,
    });

    newProsumer.save()
        .then(() => res.json('User and prosumer added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:houseid').view((req, res) => {
    Prosumer.findById(req.params.houseid, function (err, pros) {
        if (err)
            res.send(err);
        res.json({
            message: 'Data Details',
            data: pros
        });
    });
});


module.exports = router;