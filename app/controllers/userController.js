const User = require('./../../models/userModel')


exports.getAllUsers = async (req, res, next) => {
     const users = await User.find();
    try {
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        });
    } catch (error) {
        console.log(error.message);
    }  
};

