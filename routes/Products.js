const express = require('express')
const products = express.Router()
const mongoose = require('mongoose')
const protectRoute = require('../securityToken/verifyToken')
const productSchema = require('../models/Products')
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
products.use(cors())

products.get('/', async (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Product = conn.model('products', productSchema)
    try {
        const getProducts = await Product.find()
        if (getProducts.length > 0) {
            res.json(getProducts)
        }
    }catch(err){
        res.send(err)
    }
})

products.get('/:id', async (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Product = conn.model('products', productSchema)
    try {
        const getProduct = await Product.findById(req.params.id)
        if (getProduct) {
            res.json(getProduct)
        }
    }catch(err){
        res.send(err)
    }
})

products.post('/', protectRoute, upload.array('images', 3), (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Product = conn.model('products', productSchema)
    const data = {
        name: req.body.name,
        description: req.body.description,
        images: [],
        data: req.body.data,
        category: req.body.category,
        freeShipping: req.body.freeShipping,
        quantity: req.body.quantity,
        price: req.body.price,
        active: true,
        discount: req.body.discount,
        sales: 0,
        createdAt: new Date()
    }
    for (let j = 0; j < req.files.length; j++) {
        data.images.push(req.files[j].filename)
    }
    Product.findOne({name: data.name})
    .then(findProducts => {
        if (!findProducts) {
            Product.create(data)
            .then(createProduct => {
                if (createProduct) {
                    res.json({status: 'product create', token: req.requestToken})
                }
            }).catch(err => {
                res.send(err)
            })
        }else{
            res.json({status: 'product exist'})
        }
    }).catch(err => {
        res.send(err)
    })
})

products.put('/:id', protectRoute, upload.array('images', 3), (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Product = conn.model('products', productSchema)
    const images = []
    for (let index = 0; index < req.files.length; index++) {
        const element = req.files[index];
        images.push(element.filename)
    }
    if (req.body.imagePrev != '') {
        const split = req.body.imagePrev.split(',')
        for (let indexTwo = 0; indexTwo < split.length; indexTwo++) {
            const elementTwo = split[indexTwo];
            images.push(elementTwo)
        }
    }
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            description: req.body.description,
            images: images,
            data: req.body.data,
            category: req.body.category,
            freeShipping: req.body.freeShipping,
            quantity: req.body.quantity,
            price: req.body.price,
            discount: req.body.discount
        }
    })
    .then(productEdit => {
        if (productEdit) {
            res.json({status: 'product edit', image: images, token: req.requestToken})
        }
    }).catch(err => {
        res.send(err)
    })
})

products.put('/changeActive/:id', protectRoute, (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Product = conn.model('products', productSchema)
    Product.findById(req.params.id)
    .then(servicios => {
        if (servicios.active) {
            Product.findByIdAndUpdate(req.params.id, {
                $set: {
                    active: false
                }
            })
            .then(back => {
                if (back) {
                    res.json({status:false, token: req.requestToken})
                }    
            }).catch(err => {
                res.send(err)
            })
        }else{
            Product.findByIdAndUpdate(req.params.id, {
                $set: {
                    active: true
                }
            })
            .then(back => {
                if (back) {
                    res.json({status:true, token: req.requestToken})
                }
            }).catch(err => {
                res.send(err)
            })
        }
    }).catch(err => {
        res.send(err)
    })
})

module.exports = products