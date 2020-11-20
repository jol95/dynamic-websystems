//Import Bio Model
Sim = require('./simulatorModel.js');

//For index
exports.index = function (req, res) {
    Sim.get(function (err, sim) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got Data Successfully!",
            data: sim       
        });
    });
};
//For creating new Simmodel
exports.add = function (req, res) {
    var sim = new Sim();
    sim.production = req.body.production? req.body.production: sim.production;
    sim.consumption = req.body.consumption;
    sim.wind = req.body.wind;
    sim.price = req.body.price;
//Save and check error
    sim.save(function (err) {
        if (err)
            res.json(err);
res.json({
            message: "Data Added!",
            data: sim
        });
    });
};
// View Simmodel
exports.view = function (req, res) {
    Sim.findById(req.params.sim_id, function (err, sim) {
        if (err)
            res.send(err);
        res.json({
            message: 'Data Details',
            data: sim
        });
    });
};
// Update Simmodel
exports.update = function (req, res) {
    Sim.findById(req.params.sim_id, function (err, sim) {
        if (err)
            res.send(err);
        sim.production = req.body.production? req.body.production: sim.production;
        sim.consumption = req.body.consumption;
        sim.wind = req.body.wind;
        sim.price = req.body.price;
//save and check errors
        sim.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Data Updated Successfully",
                data: sim
            });
        });
    });
};

exports.delete = function (req, res) {
    Sim.deleteOne({
        _id: req.params.sim_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'Data deleted'
        })
    })
}