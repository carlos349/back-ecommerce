const express = require('express')
const sales = express.Router()
const mongoose = require('mongoose')
const protectRoute = require('../securityToken/verifyToken')
const saleSchema = require('../models/Sales')
const multer = require('multer')
const { diskStorage } = require('multer')
const path = require('path')
const storage = diskStorage({
	destination: 'public/products',
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	}
})
const upload = multer({
	storage
})
const cors = require('cors')
sales.use(cors())

sales.get('/', protectRoute, async (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Sale = conn.model('sales', saleSchema)
    try {
        const getSales = await Sale.find()
        if (getSales.length > 0) {
            res.json({sales: getSales, token: req.requestToken})
        }
    }catch(err){
        res.send(err)
    }
})

sales.post('/', upload.single("transfer"), (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Sale = conn.model('sales', saleSchema)
    const data = {
        products: req.body.products,
        total: req.body.total,
        payMethod: req.body.payMethod,
        client: req.body.client,
        payInformation: req.body.payInformation,
        confirm: false,
        cancel: true,
        createdAt: new Date()
    }
    if (req.file) {
        data.payInformation.transferReceipt = req.file.filename
    }
    Sale.create(data)
    .then(saleCreate => {
        if (saleCreate) {
            res.json({status: 'sale create'})
        }
    }).catch(err => {
        res.send(err)
    })
})

sales.put('/checkoutSale/:id', protectRoute, (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Sale = conn.model('sales', saleSchema)
    Sale.findByIdAndUpdate(req.params.id, {
        $set: {
            confirm:  true
        }
    }).then(changeStatus => {
        if (changeStatus) {
            res.json({status: 'sale checked', token: req.requestToken})
        }
    }).catch(err => {
        res.send(err)
    })
})

sales.put('/:id', protectRoute, (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Sale = conn.model('sales', saleSchema)
    Sale.findByIdAndUpdate(req.params.id, {
        $set: {
            cancel:  false
        }
    }).then(changeStatus => {
        if (changeStatus) {
            res.json({status: 'sale cancel', token: req.requestToken})
        }
    }).catch(err => {
        res.send(err)
    })
})

module.exports = sales