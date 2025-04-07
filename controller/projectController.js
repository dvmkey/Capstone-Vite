const catchAsync = require('../utils/catchAsync');
const createProject = catchAsync(async (req, res, next) => {
    const body = req.body;
    const newProject = await project.create({
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        email: body.email,
        userType: body.userType,
        firstName: body.firstName,
        confirmPassword: body.confirmPassword,
    });
    return res.status(201).json({
        status: 'success',
        data: newProject,
    });
});

module.exports = {createProject,};