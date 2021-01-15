var mongoose = require('mongoose');

const gridSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    totalproduction: {  // Total production of all houses / managers.
        type: Number
    },
    totalconsumption: { // Total consumption of all the houses.
        type: Number
    },
    /*
        IMPORTANT to notice is that totalnetproduction (market electricity)
        isnt production - consumption. There is a ratio which distribute 
        the netprodution between buffer and market....!!!!
    */
    totalnetproduction:{ 
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