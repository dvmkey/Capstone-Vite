const { Sequelize } = require('sequelize');
const user = require('../db/models/user');
const catchAsync = require('../utils/catchAsync');
const preferences = require('../db/models/preferences');
const whitelist = require('../db/models/whitelist');
const phoneNumber = require('../db/models/phoneNumber');

const getAllUser = catchAsync(async (req, res, next) => {
    const users = await user.findAndCountAll({
        where: {
            userType: {
                [Sequelize.Op.ne]: '0',
            },
        },
        attributes: { exclude: ['password'] },
    });
    return res.status(200).json({
        status: 'success',
        data: users,
    });
});

const pullCall = catchAsync(async (req, res, next) => {
    console.log('Validating Request');
    const { user } = req.body;

    console.log('Pulling information from database that matches query');
    const allCalls = await callLogs.findAll({where: { user } })

    console.log('Converting to JSON.');
    const result = allCalls.map(allCalls => allCalls.toJSON());

    return res.json({
        status: 'success',
        result,
    });
});

const setPreferences = catchAsync(async (req, res, next) => {
    const body = req.body;
    console.log('--Data Payload for Preferences Recieved--');
    let newPreference;
    try {
        newPreference = await preferences.create({
            ownedBy: body.ownedBy,
            voice: body.voice,
            prompt: body.prompt
        })
    }  catch (error) {
        console.error('Error during preferences.create():', error);
        return next(new AppError('Error saving preference to the database', 500));
    }

    if (!newPreference) {
        return next(new AppError('Failed to set preferences (Sequelize did not return a new object)', 400));
    }

    const result = newPreference.toJSON();
    return res.status(203).json({
        status: 'success',
        message: 'Successfully posted to preferences service.',
        data: result
    });
});

const setWhitelist = catchAsync(async (req, res, next) => {
    const body = req.body;
    console.log('--Data Payload for Whitelist Recieved--');
    let newWhiteNumber;
    try {
        newWhiteNumber = await whitelist.create({
            ownedBy: body.ownedBy,
            phoneNumber: body.phoneNumber,
        })
    }  catch (error) {
        console.error('Error during whitelist.create():', error);
        return next(new AppError('Error saving whitelist to the database', 500));
    }

    if (!newWhiteNumber) {
        return next(new AppError('Failed to set whitelist (Sequelize did not return a new object)', 400));
    }

    const result = newWhiteNumber.toJSON();
    return res.status(204).json({
        status: 'success',
        message: 'Successfully posted to whitelist service.',
        data: result
    });
});

const setPhoneNumber = catchAsync(async (req, res, next) => {
    const body = req.body;
    console.log('--Data Payload for phone number Recieved--');
    let newPhoneNumber;
    try {
        newPhoneNumber = await phoneNumber.create({
            ownedBy: body.ownedBy,
            phoneNumber: body.phoneNumber,
        })
    }  catch (error) {
        console.error('Error during phoneNumber.create():', error);
        return next(new AppError('Error saving phone number to the database', 500));
    }

    if (!newPhoneNumber) {
        return next(new AppError('Failed to set phone number (Sequelize did not return a new object)', 400));
    }

    const result = newPhoneNumber.toJSON();
    return res.status(205).json({
        status: 'success',
        message: 'Successfully posted to phone number service.',
        data: result
    });
});

module.exports = { getAllUser, pullCall, setPreferences, setWhitelist, setPhoneNumber };