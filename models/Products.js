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
        type: Array
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
    colors: {
        type: Array
    },
    filters: {
        type: Array
    },
    reviews: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = productSchema