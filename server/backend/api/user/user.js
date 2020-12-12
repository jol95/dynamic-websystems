const router = require('express').Router();
const mongoose = require('mongoose');
let User = require('./user.model');
let Prosumer = require('./prosumer.model');

router.route('/').get((req, res) => {
    const dbpros = Prosumer.find();
    const dbuse = User.find();

    console.log(dbpros)
    console.log(dbuse)

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

    const newUser = new User({
        username,
        password,
        firstname,  
        lastname,
        houseid
      });

    newUser.save()

    const currentwind = 0 
    const currentproduction = 0  
    const netproduction = 0  
    const buffer = 0  
    const price = 0 

    const newProsumer = new Prosumer({
        houseid,
        currentwind,
        currentproduction,
        netproduction,
        buffer,
        price,
    });

    newProsumer.save()
        .then(() => res.json('Userr and prosumer added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;