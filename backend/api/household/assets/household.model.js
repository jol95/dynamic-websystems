var mongoose = require('mongoose');

const householdSchema = new mongoose.Schema({
    houseid: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    wind: {
        type: Number,
    },
    consumption: {
        type: Number,
    },
    price: {
        type: Number,
    },
    isproducing: {
        type: Boolean,
        required: true,
    },
    production: {
        type: Number,
    },
    netproduction: {
        type: Number,
    },
    buffer: {
        type: Number,
        max: 100
    },
    ratio: {
        type: Number,
    },
}, {
    timestamps: true,
});

const Household = module.exports = mongoose.model('Household', householdSchema);

module.exports = Household;