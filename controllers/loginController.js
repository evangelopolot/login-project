
exports.greet = (req, res) => {
    res.status(201).json({
        'name': 'Evangel'
    });
}

exports.storeLogin = (req, res) => {
    console.log('Post has been made.')
    const newData = {
        name: req.body.name,
        email: req.body.email
    };
    res.status(201).json(newData);
}