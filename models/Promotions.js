const mongoose = require('mongoose')
const { Schema } = mongoose

const promotionSchema = new Schema ({
    name: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: Array
    },
    url: {
        type: String
    },
    nameButton: {
        type: String
    }
})

module.exports = promotionSchema