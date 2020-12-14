const mongoose = require('mongoose');

let User = require('./user.model');
let Prosumer = require('./prosumer.model');

exports.getUser = async function(req, res) {
    await User.findOne({ email: req.body.email, password: req.body.password}, 
    function (err, user) {
        if (err){
            console.log(err);
        }
        else{
            res.json(user);
            console.log(req.body);
        }
    });
}

exports.registerUser = function(req, res) {
    const houseid = new mongoose.mongo.ObjectId();

    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const address = req.body.address;

    const newUser = new User({
        email,
        password,
        firstname,  
        lastname,
        houseid,
        address
    });

    newUser.save()

    const wind = 0 
    const production = 0  
    const consumption = 0 
    const netproduction = 0  
    const buffer = 0  
    const ratio = 0.5
    const price = 0 

    const newProsumer = new Prosumer({
        houseid,
        address,
        wind,
        production,
        consumption,
        netproduction,
        buffer,
        ratio,
        price,
    });

    newProsumer.save()
        .then(() => res.json('User and prosumer added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}