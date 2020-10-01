const mongoose = require('mongoose')
const { Schema } = mongoose

const mailSchema = new Schema ({
    mail: {
        type: String,
        required:true
    },
    website: {
        type: String,
        required:true
    },
    facebook: {
        type: String
    },
    instagram: {
        type: String
    },
    twitter: {
        type: Number
    },
    logo: {
        type: Array,
        required:true
    }
})

module.exports = mailSchema