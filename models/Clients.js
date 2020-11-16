const mongoose = require('mongoose')
const { Schema } = mongoose

const clientSchema = new Schema ({
    name: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required:true
    },
    mail: {
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
    address: {
        type: Array
    },
    phone: {
        type: String
    },
    sales: {
        type: Number
    },
    shopingCart: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    codigoRescue:{
        type:String
    }
})

module.exports = clientSchema