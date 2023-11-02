const express = require('express');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/loginRoute');
const morgan = require('morgan')
const fs = require('fs');

const app = express();
// Middleware
app.use(morgan('dev'));
app.use(express.json());
console.log('hit');
const jsonData = require('./data/data.json');

app.use(bodyParser.urlencoded());
app.use(express.static('public'));
//Routes
app.get('/form', (req, res) => {
    res.sendFile('/Users/evangel.opolot/Desktop/login-project/index.html')
})

app.post('/api/data', (req, res) => {
    console.log('Post has been made.')
    console.log(req.body);
    const newData = {
        email: req.body.email,
        password: req.body.password,
    };
    jsonData.data.push(newData);
    fs.writeFile('./data/data.json', JSON.stringify(jsonData), (err) => {
        if (err) {
            return console.log(err);
        }
    });
    console.log(`Data saved ${newData.email, newData.password}`);
    res.status(201).json({ 'message': 'Data recieved successfully' });
})

const port = 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}...`)
});

