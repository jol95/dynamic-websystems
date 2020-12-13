var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({   
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
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
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
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