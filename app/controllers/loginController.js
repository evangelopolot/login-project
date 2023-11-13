const fs = require('fs');
const path = require("path");
const jsonData = require('../data/data.json');

exports.greet = (req, res) => {
    res.status(201).json({
        'name': 'Evangel'
    });
}

exports.homepage = (req, res) => {
    res.render('index', {title: 'Home'})
}

exports.signIn = (req, res) => {
    res.render('signIn', {title: 'Sign In'})
}

exports.login = (req, res) => {
    console.log('Post has been made.')
    console.log(req.body);
    const newData = {
        email: req.body.email,
        password: req.body.password,
    };
    jsonData.data.push(newData);
    fs.writeFile(path.join(__dirname, "../", "data", "data.json"), JSON.stringify(jsonData), (err) => {
        if (err) {
            return console.log(err);
        }
    });
    console.log(`Data saved ${newData.email +" "+ newData.password}`);
    res.status(201).json({ 'message': 'Data recieved successfully' });
}
