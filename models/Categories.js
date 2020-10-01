const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoriesSchema = new Schema ({
    name: {
        type: String
    }
})

module.exports = categoriesSchema