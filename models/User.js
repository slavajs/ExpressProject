const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('User', user);