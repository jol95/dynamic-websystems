var mongoose = require('mongoose');

const prosumerSchema = new mongoose.Schema({
    houseid: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    },
    currentwind: {
        type: Number,
    },
    currentproduction: {
        type: Number,
    },
    netproduction: {
        type: Number,
    },
    buffer: {
        type: Number,
    },
    price: {
        type: Number,
    },
}, {
    timestamps: true,
});

const Prosumer  = module.exports = mongoose.model('Prosumer', prosumerSchema);

module.exports = Prosumer;