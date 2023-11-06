const express = require('express');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/loginRoute');
const morgan = require('morgan')


const app = express();
// Middleware
app.use(morgan('dev'));
app.use(express.json());

app.use(bodyParser.urlencoded());
app.use(express.static('/Users/evangelopolot/Documents/Projects/login-project/app/public'));

//Routes
app.get('/', loginRoute);
app.post('/api/data', loginRoute);


module.exports = app;
