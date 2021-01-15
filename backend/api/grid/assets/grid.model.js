var mongoose = require('mongoose');

const gridSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    totalproduction: {  // Visa
        type: Number
    },
    totalconsumption: { // Visa 
        type: Number
    },
    totalnetproduction:{ // Visa
        type: Number
    },
    buffer:{            // Visa
        type: Number    
    },
    modelprice:{        // Visa
        type: Number
    }, 
    price:{             // Visa och ändra
        type: Number
    }
}, {
    timestamps: true,
});

const Grid = module.exports = mongoose.model('Grid', gridSchema);

module.exports = Grid;