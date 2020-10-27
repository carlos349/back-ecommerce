const express = require('express')
const clients = express.Router()
const mongoose = require('mongoose')
const protectRoute = require('../securityToken/verifyToken')
const clientSchema = require('../models/Clients')
const bcrypt = require('bcrypt')
const cors = require('cors')
clients.use(cors())

clients.get('/', protectRoute, async (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Client = conn.model('clients', clientSchema)
    try {
        const getClients = await Client.find({}, {pass: 0})
        if (getClients) {
            res.json({clients: getClients, token: req.requestToken})
        }
    }catch(err){
        res.send(err)
    }
})


clients.get('/:id', async (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Client = conn.model('clients', clientSchema)
    try {
        const getClient = await Client.findById(req.params.id, {pass: 0})
        if (getClient) {
            res.json(getClient)
        }
    }catch(err){
        res.send(err)
    }
})

clients.post('/register', (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Client = conn.model('clients', clientSchema)
    const data = {
        name: req.body.name,
        lastName: req.body.lastName,
        mail: req.body.mail,
        pass: req.body.pass,
        intents: 0,
        address: '',
        phone: '',
        sales: 0,
        shopingCart: [],
        createdAt: new Date()
    }
    Client.findOne({mail: data.mail})
    .then(findClient => {
        if (!findClient) {
            bcrypt.hash(data.pass, 10, (err, hash) => {
				data.pass = hash
				Client.create(data)
				.then(clientCreate => {
					res.json({status: 'client create'})
				})
				.catch(err => {
					res.send(err)
				})
			})
        }else{
            res.json({status: 'client exist'})
        }
    }).catch(err => {
        res.send(err)
    })
})

clients.post('/login', (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Client = conn.model('clients', clientSchema)
    Client.findOne({mail: req.body.mail})
    .then(findClient => {
        if (findClient) {
            if (findClient.intents < 3) {
                if (bcrypt.compareSync(req.body.pass, findClient.pass)) {
                    Client.findByIdAndUpdate(findClient._id, {
                        $set: {
                            intents: 0
                        }
                    })
                    .then(edit => {
                        res.json({status: 'client login',name: findClient.name,lastName:findClient.lastName,id:findClient._id})
                    }).catch(err => {
                        res.send(err)
                    })
                }else{
                    Client.findByIdAndUpdate(findClient._id, {
                        $inc: {
                            intents: 1
                        }
                    })
                    .then(intents => {
                        res.json({status: 'pass incorrect', intents: intents.intents + 1})
                    }).catch(err => {
                        res.send(err)
                    })
                }
            }else{
                res.json({status: 'client blocked'})
            }
        }else{
            res.json({status: 'client incorrect'})
        }
    })
})

clients.post('/addClientProducts/:id', (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Client = conn.model('clients', clientSchema)
    if (req.body.log == 'logged') {
        Client.findByIdAndUpdate(req.params.id, {
            $push: {
                shopingCart: req.body.product
            }
        }).then(addProduct => {
            if (addProduct) {
                res.json({status: 'product added'})
            }
        }).catch(err => {
            res.send(err)
        })
    }else{
        Client.findByIdAndUpdate(req.params.id, {
            $set: {
                shopingCart: req.body.products
            }
        }).then(addProducts => {
            if (addProducts) {
                res.json({status: 'products added'})
            }
        }).catch(err => {
            res.send(err)
        })
    }
    
})

clients.put('/rescuePass/:id', (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Client = conn.model('clients', clientSchema)
    Client.findById(req.params.id)
    .then(findClient => {
        if (findClient) {
            bcrypt.hash(req.body.pass, 10, (err, hash) => {
                const pass = hash
                Client.findByIdAndUpdate(findClient._id, {
                    $set: {
                        pass: pass,
                        intents: 0
                    }
                })
                .then(changePass => {
                    if (changePass) {
                        res.json({status: 'pass changed'})
                    }
                }).catch(err => {
                    res.send(err)
                })
            })
        }
    }).catch(err => {
        res.send(err)
    })
})

module.exports = clients