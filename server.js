const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const server = require('http').Server(app);
const mongoose = require('mongoose')


// settings
app.set('port', process.env.PORT || 2200)
app.set('trust proxy', true);

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

//Routes
app.use('/users', require('./routes/Users.js'))
app.use('/categories', require('./routes/Categories.js'))
app.use('/clients', require('./routes/Clients.js'))
app.use('/products', require('./routes/Products.js'))
app.use('/sales', require('./routes/Sales.js'))
app.use('/quotations', require('./routes/quotations.js'))
app.use('/mails', require('./routes/Mails.js'))
app.use('/promotions', require('./routes/Promotions.js'))
app.use('/filters', require('./routes/Filters.js'))

//Static files

app.use('/static', express.static(__dirname + '/public'));

server.listen(app.get('port'), () => {
	console.log('Server on port: ', app.get('port'))
});