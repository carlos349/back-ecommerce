const express = require('express')
const users = express.Router()
const mongoose = require('mongoose')
const protectRoute = require('../securityToken/verifyToken')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const key = require('../private/key-jwt');
const userSchema = require('../models/Users')
const cors = require('cors')
users.use(cors())

users.get('/createSuperUser', (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const User = conn.model('users', userSchema)
    const data = {
        user: 'admin@gmail.com',
        pass: '1234',
        intents: 0,
        lastEntry: new Date(),
        createdAt: new Date()
    }
    bcrypt.hash(data.pass, 10, (err, hash) => {
        data.pass = hash 
        User.create(data)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.send(err)
        })
    })
    
})

users.post('/', (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const User = conn.model('users', userSchema)
    const user = {
        name: req.body.name,
        user: req.body.user,
        pass: req.body.pass,
        intents: 0,
        lastEntry: new Date(),
        createdAt: new Date()
    }
    User.findOne({user: user.user})
    .then(find => {
        if (!find) {
            bcrypt.hash(user.pass, 10, (err, hash) => {
				user.pass = hash
				User.create(user)
				.then(userCreate => {
					res.json({status: 'user create', token: req.requestToken})
				})
				.catch(err => {
					res.send(err)
				})
			})
        }else{
            res.json({status: 'User already exist'})
        }
    }).catch(err => {
        res.send(err)
    })
})


users.post('/login', (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const User = conn.model('users', userSchema)
    const today = new Date()
    console.log(req.body.user)
    User.findOne({user: req.body.user})
    .then(findUser => {
        if (findUser) {
            if (findUser.intents < 3) {
                if (bcrypt.compareSync(req.body.pass, findUser.pass)) {
                    User.findByIdAndUpdate(findUser._id, {
                        $set: {
                            lastEntry: today,
                            intents: 0
                        }
                    })
                    .then(edit => {
                        const payload = {
                            _id: findUser._id,
                            name: findUser.name,
                            user: findUser.user,
                            LastAccess: findUser.LastAccess
                        }
                        let token = jwt.sign(payload, key.key, {
                            expiresIn: 60 * 60 * 24
                        })
                        res.json({status: 'user login', token: token})
                    }).catch(err => {
                        res.send(err)
                    })
                }else{
                    User.findByIdAndUpdate(findUser._id, {
                        $inc: {
                            intents: 1
                        }
                    })
                    .then(intents => {
                        res.json({status: 'pass incorrect', intents: intents.intents + 1})
                    })
                    .catch(err => {
                        res.send(err)
                    })
                }
            }else{
                res.json({status: 'user blocked'}) 
            }
        }else{
            res.json({status: 'user incorrect'})
        }
    }).catch(err => {
        res.send(err)
    })
})

users.put('/changePass/:id', protectRoute, (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const User = conn.model('users', userSchema)
    User.findById(req.params.id)
    .then(find => {
        if (find) {
            if (bcrypt.compareSync(req.body.pass, find.pass)) {
                bcrypt.hash(req.body.newPass, 10, (err, hash) => {
                    const pass = hash
                    User.findByIdAndUpdate(find._id, {
                        $set: {
                            pass: pass
                        }
                    })
                    .then(changePass => {
                        if (changePass) {
                            res.json({status: 'pass changed', token: req.requestToken})
                        }
                    })
                })
            }else{
                res.json({status: 'pass incorrect'})
            }
        }else{
            res.json({status: 'user does exist'})
        }
    }).catch(err => {
        res.send(err)
    })
})

users.put('/rescuePass/:id', (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const User = conn.model('users', userSchema)
    User.findById(req.params.id)
    .then(find => {
        if (find) {
            bcrypt.hash(req.body.pass, 10, (err, hash) => {
                const pass = hash
                User.findByIdAndUpdate(find._id, {
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
        }else{
            res.json({status: 'user does exist'})
        }
    }).catch(err => {
        res.send(err)
    })
})

users.get('/', protectRoute, async (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const User = conn.model('users', userSchema)
    try {
        const users = await User.find({}, {pass: 0})
        if (users.length > 0) {
            res.json({users: users, token: req.requestToken})
        }
    }catch(err){
        res.send(err)
    }
})

users.get('/:id', protectRoute, async (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const User = conn.model('users', userSchema)
    try {
        const user = await User.findById(req.params.id, {pass: 0})
        if (user) {
            res.json({user: user, token: req.requestToken})
        }
    }catch(err){
        res.send(err)
    }
})

users.delete('/:id', protectRoute, async (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const User = conn.model('users', userSchema)
    try {
        const userDelete = await User.findByIdAndRemove(req.params.id)
        if (userDelete) {
            res.json({status: 'user delete', token: req.requestToken})
        }
    }catch(err){
        res.send(err)
    }
})

module.exports = users