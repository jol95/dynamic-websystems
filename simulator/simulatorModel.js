// simulatorModel

var mongoose = require('mongoose');

var simulatorSchema = new mongoose.Schema({   
    production: {
        type: Number
    },
    consumption: {
        type: Number
    },     
    wind: {
        type: Number
    },
    price: {
        type: Number
    } 
});

// Export simulator model
var Sim  = module.exports = mongoose.model('sim', simulatorSchema);

module.exports.get = function (callback, limit) {
    Sim.find(callback).limit(limit); 
 }