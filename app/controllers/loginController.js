const fs = require('fs');
const path = require("path");
const jsonData = require('../data/data.json');
const users = require("../data/users.json");
const { log } = require('console');


exports.homepage = (req, res) => {
    res.render('index', {title: 'Home'})
}

exports.signIn = (req, res) => {
    res.render('signIn', {title: 'Sign In'})
}

exports.signUp = (req, res) => {
    res.render('signUp', {title: 'Sign Up'})
}

exports.login = (req, res) => {
    console.log('Post has been made.')
    console.log(req.body);

    let email = JSON.stringify(req.body.email);

    const newData = {
        email: email,
        password: req.body.password,
    };
    jsonData.data.push(newData);
    fs.writeFile(path.join(__dirname, "../", "data", "data.json"), JSON.stringify(jsonData), (err) => {
        if (err) {
            return console.log(err);
        }
    }); 
    res.status(201).json(
        { 'message': 'Data recieved successfully' });
}
 
exports.createUser = (req, res) => {
    const newUserData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    };
    console.log(newUserData);
    users.data.push(newUserData);
    
    fs.writeFile(path.join(__dirname, "../", "data", "users.json"), JSON.stringify(newUserData), (err) => {
        if (err) {
            return console.log(err);
        }
    });
    res.status(201).json(
        { 'message': 'Data recieved successfully' });
}