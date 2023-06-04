const mongoose = require('mongoose');


// schema creation
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false,
    }
},

)



//model creation
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;