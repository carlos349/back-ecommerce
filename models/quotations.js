const mongoose = require('mongoose');
const { Schema } = mongoose;

const quotationsSchema = new Schema ({
    createdAt: {
        type: Date,
        default: Date.now
    },
    products: {
        type: Array
    },
    dataClient: {
        type: Object
    },
    status: {
        type:String
    }
})

module.exports = quotationsSchema