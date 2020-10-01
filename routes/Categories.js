const express = require('express')
const categories = express.Router()
const mongoose = require('mongoose')
const protectRoute = require('../securityToken/verifyToken')
const categoriesSchema = require('../models/Categories')
const cors = require('cors')
categories.use(cors())

categories.get('/', async (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Category = conn.model('categories', categoriesSchema)
    try {
        const getCategories = await Category.find()
        if (getCategories.length > 0) {
            res.json(getCategories)
        }
    }catch(err){
        res.send(err)
    }
})

categories.post('/', protectRoute, (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Category = conn.model('categories', categoriesSchema)
    Category.findOne({name: req.body.name})
    .then(findCategory => {
        if (!findCategory) {
            Category.create({name: req.body.name})
            .then(createCategory => {
                if (createCategory) {
                    res.json({status: 'category create', token: req.requestToken})
                }
            })
        }else{
            res.json({status: 'category exist'})
        }
    }).catch(err => {
        res.send(err)
    })
})

categories.delete('/:id', protectRoute, async (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Category = conn.model('categories', categoriesSchema)
    try {
        const categoryDelete = await Category.findByIdAndRemove(req.params.id)
        if (categoryDelete) {
            res.json({status: 'category delete', token: req.requestToken})
        }
    }catch(err){
        res.send(err)
    }
})

module.exports = categories