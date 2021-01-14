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
    id: {
        type: String,
        required: 'Correct id',
        unique: true
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    role: {
        type: String,
    },
    production: {
        type: Number,
    },
    status: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
}, {
    timestamps: true,
});

const Manager  = module.exports = mongoose.model('Manager', managerSchema);

module.exports = Manager;