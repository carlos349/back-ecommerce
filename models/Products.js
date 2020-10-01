const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema ({
    name: {
        type: String
    },
    description: {
        type: String
    },
    images: {
        type: Array
    },
    data: {
        type: Object
    },
    category: {
        type: String
    },
    freeShipping: {
        type: Boolean
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    active: {
        type: Boolean
    },
    discount: {
        type: Number
    },
    sales: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = productSchema