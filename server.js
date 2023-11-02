const app = require('./app')

app.post('/api/data', (req, res) => {
    console.log('Post has been made.')
    const newData = {
        name: req.body.name,
        email: req.body.email
    };
    res.status(201).json(newData);
})

const port = 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}...`)
});
