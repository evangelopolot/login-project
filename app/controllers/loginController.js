
exports.greet = (req, res) => {
    res.status(201).json({
        'name': 'Evangel'
    });
}

exports.homePage = (req, res) => {
    console.log("Homepage hit")
    res.sendFile('/Users/evangelopolot/Documents/Projects/login-project/app/public/index.html');
}

exports.signIn = (req, res) => {
    res.sendFile('/Users/evangelopolot/Documents/Projects/login-project/app/public/signIn.html');
}

exports.login = (req, res) => {
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
}
