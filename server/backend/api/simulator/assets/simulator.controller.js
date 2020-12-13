const mongoose = require('mongoose');
const Prosumer = require('../../user/assets/prosumer.model');

exports.getHouses = function(req, res) {
    Prosumer.find(function (err, house) {
        if (err){
            console.log(err);
        }
        else{
            res.json(house);
        }
    });
}

exports.addHouse = function(req, res) {
    const houseid = new mongoose.mongo.ObjectId();

    const address = req.body.address;
    const wind = 0;
    const production = 0;
    const consumption = 0;
    const netproduction = 0;  
    const buffer = 0;  
    const price = 0; 

    const newProsumer = new Prosumer({
        houseid,
        address,
        wind,
        production,
        consumption,
        netproduction,
        buffer,
        price,
    });

    newProsumer.save()
        .then(() => res.json('Prosumer added!'))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.getHouse = function(req, res) {
    Prosumer.find({ houseid: req.params.houseid}, function (err, house) {
        if (err){
            console.log(err);
        }
        else{
            res.json(house);
        }
    });
};

exports.updateHouse = function(req, res) {
    Prosumer.find({ houseid: req.params.houseid}, function (err, house) {

        house.wind = req.body.wind;
        house.production = req.body.production;
        house.consumption = req.body.consumption;
        house.netproduction = req.body.netproduction;
        house.buffer = req.body.buffer;
        house.price = req.body.price;

        house.save();
        
    });
};

