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

// Export simulator model
var Sim  = module.exports = mongoose.model('Sim', simulatorSchema);

module.exports = Sim;