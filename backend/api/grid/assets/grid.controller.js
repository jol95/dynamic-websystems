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

exports.updateGrid = function(req, res) {
    Grid.findOne({}, function (err, grid) {
        grid.totalproduction = req.body.totalproduction? req.body.totalproduction: grid.totalproduction;
        grid.totalconsumption = req.body.totalconsumption? req.body.totalconsumption: grid.totalconsumption;

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
