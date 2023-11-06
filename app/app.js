const express = require('express');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/loginRoute');
const morgan = require('morgan')


const app = express();
// Middleware
app.use(morgan('dev'));
app.use(express.json());
const jsonData = require('./data/data.json');

app.use(bodyParser.urlencoded());
app.use(express.static('./app/public'));

//Routes
app.get('/', loginRoute);

module.exports = app;
