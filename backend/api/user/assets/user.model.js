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
    address: {
        type: String,
        required: 'Enter correct address'
    }
}, {
    timestamps: true,
});

const User  = module.exports = mongoose.model('User', userSchema);

module.exports = User;