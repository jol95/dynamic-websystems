const mongoose = require('mongoose');
const Household = require('../../user/assets/prosumer.model');

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

    const wind = 0 
    const consumption = 0 
    const price = 0 

    const isproducing = false
    const production = 0  
    const netproduction = 0  
    const buffer = 0  
    const ratio = 0.5

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
        .then(() => res.json('Prosumer added!'))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.getHouse = function(req, res) {
    Household.findOne({ houseid: req.params.houseid}, function (err, house) {
        if (err){
            console.log(err);
        }
        else{
            res.json(house);
        }
    });
};

exports.updateHouse = function(req, res) {
    Household.findOne({ houseid: req.params.houseid}, function (err, house) {
        house.wind = req.body.wind? req.body.wind: house.wind;
        house.consumption = req.body.consumption? req.body.consumption: house.consumption;
        house.price = req.body.price? req.body.price: house.price;
        house.production = req.body.production? req.body.production: house.production;
        house.netproduction = req.body.netproduction? req.body.netproduction: house.netproduction;
        house.buffer = req.body.buffer? req.body.buffer: house.buffer;
        house.ratio = req.body.ratio? req.body.ratio: house.ratio;

        house.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Data Updated Successfully",
                data: house
            });
        });

    });
};

