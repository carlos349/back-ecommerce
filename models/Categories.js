const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoriesSchema = new Schema ({
    name: {
        type: String
    },
    count: {
        type: Number
    }
})

module.exports = categoriesSchema