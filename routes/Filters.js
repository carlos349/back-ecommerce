const express = require('express')
const filters = express.Router()
const mongoose = require('mongoose')
const protectRoute = require('../securityToken/verifyToken')
const filterSchema = require('../models/Filters')
const cors = require('cors')
filters.use(cors())

filters.get('/', async (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Filter = conn.model('filters', filterSchema)

    try {   
        const getFilters = await Filter.find()
        res.json(getFilters) 
    }catch(err){
        res.send(err)
    }
})

filters.post('/', protectRoute, (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Filter = conn.model('filters', filterSchema)
    const data = {
        name: req.body.name,
        options: req.body.options
    }
    Filter.findOne({name: data.name})
    .then(findFilter => {
        if (findFilter) {
            res.json({status: 'filter exist'})
        }else{
            Filter.create(data)
            .then(createFilter => {
                if (createFilter) {
                    res.json({status: 'filter create', token: req.requestToken})
                }
            }).catch(err => {
                res.send(err)
            })
        }
    }).catch(err => {
        res.send(err)
    })
})

filters.put('/:id', protectRoute, (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Filter = conn.model('filters', filterSchema)

    Filter.findByIdAndUpdate(req.params.id, {
        $set: {
            options: req.body.options
        }
    })
    .then(updateFilter => {
        if (updateFilter) {
            res.json({status: 'filter update', token: req.requestToken})
        }
    })
    .catch(err => {
        res.send(err)
    })
})

filters.delete('/:id', protectRoute, (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Filter = conn.model('filters', filterSchema)

    Filter.findByIdAndRemove(req.params.id)
    .then(removeFilter => {
        if (removeFilter) {
            res.json({status: 'filter remove', token: req.requestToken})
        }
    }).catch(err  => {
        res.send(err)
    })
})

module.exports = filters