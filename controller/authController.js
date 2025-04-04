const user = require("../db/models/user");

const signup = (req,res,next) => {
    const body = req.body;

    if(!['1'].includes(body.userType)){
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid User Type.',
        });
    }

    const newUser = user.create({
        userType: body.userType,
        firstName: body.firstName,
        lastnName: body.lastnName,
        email: body.email,
        password: body.password,
    });

    if (!newUser){
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid User Type.',
        });
    }

    return res.status(201).json({
        status: 'success',
        data: newUser,
    });
};

module.exports = { signup };