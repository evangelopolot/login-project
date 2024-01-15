const jwt = require('jsonwebtoken');
const User = require ('./../../models/userModel');

exports.signup = async (req, res, next) => {

    // Make sure you are only accepting what you need from the users and nothing else
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
    console.log("This is the new user, ", newUser);

    const token = jwt.sign({ id: newUser._id}, `${process.env.JWT_SECRET}`, {
        expiresIn: `${process.env.JWT_EXPIRES_IN}`
    });

    try {
        res.status(201).json({
            status: 'succes',
            token,
            data: {
                user: newUser
            }
        })
    } catch (err) {
        console.log(err.message);
    }
}

exports.login = (req, res, next) => {
    const { email, password } = req.body.email;

    // Check if email and password exist
    if(!email || !password) {
        // Replace this with the Error class you've created
        next(new Error('Please provide email and password!', 404));
    }

    // Check if the users 
    const token = '';
    res.status(200).json({
        status:'success',
        token
    })
}