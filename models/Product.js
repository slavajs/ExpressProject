const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const product = new Schema({
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true 
    },
    imagePsth: {
        required: true,
        type: String
    }
})




















































































































































































































































































































































































































































