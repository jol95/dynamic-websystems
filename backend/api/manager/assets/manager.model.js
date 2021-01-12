var mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({   
    email: {
        type: String,
        required: 'Enter your email',
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: 'Enter your password',
        trim: true,
        minlength: 3
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    status: {
        type: String,
        required: 'Enter correct address'
    },
    date: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true,
});

const Manager  = module.exports = mongoose.model('Manager', managerSchema);

module.exports = Manager;