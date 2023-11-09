const express = require('express');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/loginRoute')
const path = require("path");
const morgan = require('morgan')


const app = express();
// Middleware
app.use(morgan('dev'));
app.use(express.json());

app.use(bodyParser.urlencoded());

// Gives access to all the files in the publlic folder and not just the htmml being send.
// Does the file matching.
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.get('/', loginRoute);
app.post('/api/data', loginRoute);


module.exports = app;
