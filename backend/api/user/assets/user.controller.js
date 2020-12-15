const mongoose = require('mongoose');

let User = require('./user.model');
let Household = require('./household.model');

exports.getUser = async function(req, res) {
    console.log(req.body);
    await User.findOne({ email: req.body.email, password: req.body.password}, 
    async function (err, user) {
        if (err){
            console.log(err);
        }
        else{
            console.log(req.body);
            res.json(user);
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
        houseid,
        firstname,  
        lastname,
        address
    });

    newUser.save()

    const wind = 0 
    const consumption = 0 
    const price = 0 
    const isproducing = true
    const production = 0  
    const consumption = 0 
    const netproduction = 0  
    const buffer = 0  
    const ratio = 0.5
    const price = 0 

    const newHousehold = new Household({
        houseid,
        address,
        wind,
        consumption,
        price,
        isproducing,
        production,
        netproduction,
        buffer,
        ratio,
    });

    newHousehold.save()
        .then(() => res.json('User and prosumer added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}