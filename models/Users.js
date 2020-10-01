const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema ({
    name: {
        type: String
    },
    user: {
        type: String,
        required:true
    },
    pass: {
        type: String,
        required:true
    },
    intents: {
        type: Number
    },
    lastEntry: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = userSchema