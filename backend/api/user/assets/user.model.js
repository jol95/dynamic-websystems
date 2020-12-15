var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({   
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
    houseid: {
        type: String,
        required: 'Correct house id',
        unique: true
    },
    address: {
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

const User  = module.exports = mongoose.model('User', userSchema);

module.exports = User;