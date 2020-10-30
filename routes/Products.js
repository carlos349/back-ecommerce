const express = require('express')
const products = express.Router()
const categories = express.Router()
const categoriesSchema = require('../models/Categories')
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
        res.json(getProducts)
    }catch(err){
        res.send(err)
    }
})

products.get('/featured', async (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Product = conn.model('products', productSchema)
    try {
        const getProducts = await Product.find().sort({sales:-1}).limit(6)
        res.json(getProducts)
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

products.post('/', protectRoute, (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Product = conn.model('products', productSchema)
    const data = {
        name: req.body.name,
        description: req.body.description,
        images: req.body.images,
        data: req.body.data,
        category: req.body.category,
        freeShipping: req.body.freeShipping,
        quantity: req.body.quantify,
        price: req.body.price,
        active: req.body.active,
        discount: req.body.discount,
        sales: 0,
        colors: req.body.colors,
        filters: req.body.filters,
        reviews:[],
        createdAt: new Date()
    }
    console.log(data)
    Product.findOne({name: data.name})
    .then(findProducts => {
        if (!findProducts) {
            Product.create(data)
            .then(createProduct => {
                if (createProduct) {
                    const Category = conn.model('categories', categoriesSchema)
                    Category.update({name: req.body.category},{$inc:{count:1}})
                    .then(update =>{
                        if (update) {
                            res.json({status: 'product create', token: req.requestToken})
                        }
                    })
                    .catch(err => {
                        res.send(err)
                    })
                }
            })
        }else{
            res.json({status: 'product exist'})
        }
    }).catch(err => {
        res.send(err)
    })
})

products.put('/:id', protectRoute, (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Product = conn.model('products', productSchema)

    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            description: req.body.description,
            images: req.body.images,
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
            res.json({status: 'product edit', token: req.requestToken})
        }
    }).catch(err => {
        res.send(err)
    })
})

products.get('/changeActive/:id', protectRoute, (req, res) => {
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

products.delete('/:id', protectRoute, async (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Product = conn.model('products', productSchema)
    try {
        const productDelete = await Product.findByIdAndRemove(req.params.id)
        if (productDelete) {
            res.json({status: 'product delete', token: req.requestToken})
        }
    }catch(err){
        res.send(err)
    }
})

products.post('/uploadImage', upload.single("file"), (req, res) => {
    
    res.json({status:"done",name:req.file.filename,url:"http://localhost:3200/static/products/"+req.file.filename, thumbUrl:"http://localhost:3200/static/products/"+req.file.filename})
})

module.exports = products