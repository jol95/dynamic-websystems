var mongoose = require('mongoose');

const gridSchema = new mongoose.Schema({
    totalproduction: {
        type: Number,
    },
    totalconsumption: {
        type: Number,
    }
}, {
    timestamps: true,
});

const Grid = module.exports = mongoose.model('Grid', gridSchema);

module.exports = Grid;