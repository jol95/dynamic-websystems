var mongoose = require('mongoose');

const gridSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    totalproduction: {
        type: Number
    },
    totalconsumption: {
        type: Number
    },
    totalnetproduction:{
        type: Number
    }
}, {
    timestamps: true,
});

const Grid = module.exports = mongoose.model('Grid', gridSchema);

module.exports = Grid;