const mongoose = require('mongoose')
const { Schema } = mongoose

const saleSchema = new Schema ({
    products: {
        type: Array
    },
    total: {
        type: Number
    },
    payMethod: {
        type: String
    },
    client: {
        type: Object
    },
    payInformation: {
        type: Object
    },
    status: {
        type: Boolean
    },
    cancelSale: {
        type: Boolean
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = saleSchema