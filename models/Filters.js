const mongoose = require('mongoose')
const { Schema } = mongoose

const filterSchema = new Schema ({
    name: {
        type: String
    },
    options: {
        type: Array
    }
})

module.exports = filterSchema