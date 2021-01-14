var mongoose = require('mongoose');

const householdSchema = new mongoose.Schema({
    id: {
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
    production: {
        type: Number,
    },
    consumption: {
        type: Number,
    },
    netproduction: {
        type: Number,
    },
    ratio: {
        type: Number,
    },
    buffer: {
        type: Number,
    },
    isproducing: {
        type: Boolean,
        required: true,
    },
    blackout: {
        type: Boolean,
        required: true,
    },
    img: {
        type: String
    }
}, {
    timestamps: true,
});

const Household = module.exports = mongoose.model('Household', householdSchema);

module.exports = Household;