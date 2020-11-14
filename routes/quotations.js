const express = require('express')
const quotations = express.Router()
const mongoose = require('mongoose')
const protectRoute = require('../securityToken/verifyToken')
const quotationsSchema = require('../models/quotations')
const cors = require('cors')
quotations.use(cors())

quotations.get('/', async (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Quotation = conn.model('quotations', quotationsSchema)
    try {
        const quotations = await Quotation.find()
        if (quotations.length > 0) {
            res.json({status:'ok', quotations: quotations})
        }else{
            res.json({status: 'quotations does exist'})
        }
    }catch(err){
        res.send(err)
    }
})

quotations.post('/', (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Quotation = conn.model('quotations', quotationsSchema)
    const data = {
        products: req.body.products,
        dataClient: req.body.dataClient,
        status: 'pending',
        clientId: req.body.clientId
    }
    Quotation.create(data)
    .then(QuotationCreate => {
        if (QuotationCreate) {
            res.json({status: 'Quotation create', token: req.requestToken})
        }
    }).catch(err => {
        res.send(err)
    })
})

quotations.delete('/:id', protectRoute, (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Quotation = conn.model('quotations', quotationsSchema)
    Quotation.findByIdAndRemove(req.params.id)
    .then(QuotationDelete => {
        if (QuotationDelete) {
            res.json({status: 'Quotation delete', token: req.requestToken})
        }
    }).catch(err => {
        res.send(err)
    })
})

quotations.put('/:id', (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Quotation = conn.model('quotations', quotationsSchema)

    Quotation.findByIdAndUpdate(req.params.id, {
        $set: {
            status: req.body.status
        }
    })
    .then(changeStatus => {
        if (changeStatus) {
            res.json({status: 'status changed'})
        }
    }).catch(err => {
        res.send(err)
    })
    
})

quotations.get('/:id', async (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Quotation = conn.model('quotations', quotationsSchema)
    try {
        const getClient = await Quotation.find({clientId:req.params.id})
        if (getClient) {
            res.json(getClient)
        }
    }catch(err){
        res.send(err)
    }
})

module.exports = quotations