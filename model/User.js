const mongoose = require('mongoose');
const schema = mongoose.Schema


const userSchema = new schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1048,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);