var mongoose = require('mongoose');

const simulatorSchema = new mongoose.Schema({   
    production: {
        type: Number,
    },
    consumption: {
        type: Number,
    },     
    wind: {
        type: Number,
    },
    price: {
        type: Number,
    },
}, {
    timestamps: true,
});

const Simulator  = module.exports = mongoose.model('Simulator', simulatorSchema);

module.exports = Simulator;