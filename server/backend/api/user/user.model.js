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
        type: Number,
    },
    lastname: {
        type: Number,
    },
    houseid: {
        type: Number,
        required: true,
        unique: true
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