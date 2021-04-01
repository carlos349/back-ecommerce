const express = require('express')
const promotions = express.Router()
const mongoose = require('mongoose')
const protectRoute = require('../securityToken/verifyToken')
const promotionSchema = require('../models/Promotions')
const uploadS3 = require('../common-midleware/index')
const cors = require('cors')
promotions.use(cors())

promotions.get('/', async (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Promotion = conn.model('promotions', promotionSchema)
    try {
        const promotions = await Promotion.find()
        if (promotions.length > 0) {
            res.json({status:'ok', promotions: promotions})
        }else{
            res.json({status: 'promotions does exist'})
        }
    }catch(err){
        res.send(err)
    }
})

promotions.post('/', protectRoute, (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Promotion = conn.model('promotions', promotionSchema)
    const data = {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        url: req.body.url,
        nameButton: req.body.nameButton
    }
    Promotion.findOne({name: data.name})
    .then(findPromotion => {
        if (!findPromotion) {
            Promotion.create(data)
            .then(promotionCreate => {
                if (promotionCreate) {
                    res.json({status: 'promotion create', id: promotionCreate._id, token: req.requestToken})
                }
            }).catch(err => {
                res.send(err)
            })
        }else{
            res.json({status: 'promotion exist'})
        }
    }).catch(err => {
        res.send(err)
    })
})

promotions.delete('/:id', protectRoute, (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Promotion = conn.model('promotions', promotionSchema)
    Promotion.findByIdAndRemove(req.params.id)
    .then(promotionDelete => {
        if (promotionDelete) {
            res.json({status: 'promotion delete', token: req.requestToken})
        }
    }).catch(err => {
        res.send(err)
    })
})

promotions.put('/:id', protectRoute, (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Promotion = conn.model('promotions', promotionSchema)
    if(req.file){
        Promotion.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                description: req.body.description,
                image: req.file.filename,
                url: req.body.url,
                nameButton: req.body.nameButton
            }
        })
        .then(promotionEdit => {
            if (promotionEdit) {
                res.json({status: 'promotion edit', token: req.requestToken})
            }
        })
        .catch(err => {
            res.send(err)
        })
    }else{
        Promotion.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                description: req.body.description,
                url: req.body.url,
                image: req.body.image,
                nameButton: req.body.nameButton
            }
        })
        .then(promotionEdit => {
            if (promotionEdit) {
                res.json({status: 'promotion edit', token: req.requestToken})
            }
        })
        .catch(err => {
            res.send(err)
        })
    }
})

promotions.post('/uploadImage', uploadS3.single("file"), (req, res) => {
    res.json({status:"done", name: req.file.location, url: req.file.location, thumbUrl: req.file.location})
})

module.exports = promotions