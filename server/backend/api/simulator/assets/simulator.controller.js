const mongoose = require('mongoose');

exports.getHouses = function(req, res) {
    
}

exports.addHouse = function(req, res) {
    const houseid = new mongoose.mongo.ObjectId()

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
}

exports.getHouse = function(req, res) {
    Prosumer.find({ houseid: req.params.houseid}, function (err, house) {
        if (err){
            console.log(err);
        }
        else{
            res.json(house);
        }
    });
}

exports.updateHouse = function(req, res) {
    
}

