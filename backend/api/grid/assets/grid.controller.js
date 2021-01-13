const mongoose = require('mongoose');
const Grid = require('./grid.model');

exports.getGrid = async function(req, res) {
    Grid.findOne({}, function (err, house) {
        if (err){
            console.log(err);
        }
        else{
            res.json(house);
        }
    });
}

exports.createGrid = function(req, res) {
    const id = 1;   // Grid is unique. Therefore fixed value so its not possible to create multiple. 
    const totalproduction = 0;
    const totalconsumption = 0;
    const totalnetproduction = 0;
    const price = 0;

    const newGrid = new Grid({
        id,
        totalproduction,
        totalconsumption,
        totalnetproduction,
        price
    });

    newGrid.save()
        .then(() => res.json('Grid added!'))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.updateGrid = function(req, res) {
    Grid.findOne({}, function (err, grid) {
        grid.totalproduction = req.body.totalproduction? req.body.totalproduction: grid.totalproduction;
        grid.totalconsumption = req.body.totalconsumption? req.body.totalconsumption: grid.totalconsumption;
        grid.totalnetproduction = req.body.totalnetproduction? req.body.totalnetproduction: grid.totalnetproduction;
        grid.price = grid.body.price? req.body.price: grid.price;

        grid.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Grid Updated Successfully",
                data: grid
            });
        });

    });
};
