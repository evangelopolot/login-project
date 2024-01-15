const jwt = require('jsonwebtoken');
const User = require ('./../../models/userModel');

const signToken = (id) => {
    return jwt.sign({ id: id}, `${process.env.JWT_SECRET}`, {
        expiresIn: `${process.env.JWT_EXPIRES_IN}`
    });
}

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

    const token = signToken(newUser._id);

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

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);

    // Check if email and password exist
    if(!email || !password) {
        // Replace this with the Error class you've created
        // use return to end the journey if an error is encouted or otherwise REMBEMER
        return next(new Error('Please provide email and password!', 404));
    }

    // Check if the users exists & password matches
    // Since password select is false, it's not returned, so you need to select it explicitly and add a plus sign to it.
    const user = await User.findOne({email: email}).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new Error('Incorrect email or password!', 401))
    }

    const token = signToken(user._id);
    res.status(200).json({
        status:'success',
        token
    });
}