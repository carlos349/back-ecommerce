const express = require('express')
const mongoConnect = express.Router()
const mongoose = require('mongoose')

mongoConnect.use((req, res, next) => {
    const database = req.headers['x-database-connect'];
    try {
        const conn = mongoose.createConnection('mongodb://localhost/'+database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        req.connection = conn
        console.log(conn)
        console.log(req.connection)
    }catch(err){
        res.send(err)
    }
});

module.exports = mongoConnect