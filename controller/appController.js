const catchAsync = require('../utils/catchAsync');
const callLogs = require('../db/models/call-logs');
const preferences = require('../db/models/preferences');
const whitelist = require('../db/models/whitelist');
const phoneNumber = require('../db/models/phoneNumber');
const callStack = require('../db/models/call-stack');

const logCall = catchAsync(async (req, res, next) => {
    const body = req.body;
  
    console.log('--- Incoming Body Data ---');
    console.log('User:', body.user);
    console.log('Scammer:', body.scammerName);
    console.log('Deal:', body.scammerDeal);
    console.log('Notes:', body.specialNotes);
    console.log('Transcript:', body.fullTranscript);
    console.log('Start:', body.callStart);
    console.log('End:', body.callEnd);
  
    let newLog;
    try {
      newLog = await callLogs.create({
        user: body.user,
        scammerName: body.scammerName,
        scammerDeal: body.scammerDeal,
        specialNotes: body.specialNotes,
        fullTranscript: body.fullTranscript,
        callStart: body.callStart,
        callEnd: body.callEnd,
      });
    } catch (error) {
      console.error('Error during callLogs.create():', error);
      return next(new AppError('Error saving call log to the database', 500));
    }
  
    if (!newLog) {
      return next(new AppError('Failed to create the log (Sequelize did not return a new object)', 400));
    }
  
    const result = newLog.toJSON();
  
    return res.status(202).json({
      status: 'success',
      message: 'Successfully posted to Call Log service.',
      data: result
    });
});

const pullPref = catchAsync(async (req, res, next) => {
    console.log('Validating Request');
    const { ownedBy } = req.body;

    console.log('Pulling information from database that matches query');
    const recentPref = await preferences.findOne({where: { ownedBy }, order: [['id', 'DESC']], });

    console.log('Converting to JSON.');
    const result = recentPref.toJSON();

    return res.json({
        status: 'success',
        result,
    });
})

const pullWhite = catchAsync(async (req, res, next) => {
    console.log('Validating Request');
    const { ownedBy } = req.body;

    console.log('Pulling information from database that matches query');
    const whiteList = await whitelist.findAll({where: { ownedBy }});

    console.log('Converting to JSON.');
    const result = whiteList.map(whiteList => whiteList.toJSON());

    return res.json({
        status: 'success',
        result,
    });
})

const pullPhone = catchAsync(async (req, res, next) => {
  console.log('Validating Request');
  const { ownedBy } = req.body;

  console.log('Pulling information from database that matches query');
  const phonenumber = await phoneNumber.findAll({where: { ownedBy }});

  console.log('Converting to JSON.');
  const result = phonenumber.map(phonenumber => phonenumber.toJSON());

  return res.json({
      status: 'success',
      result,
  });
})

const postCall = catchAsync( async (req, res, next) => {
  const body = req.body;

  let newCall;
    try {
      newCall = await callStack.create({
        ownedBy: body.ownedBy
      });
    } catch (error) {
      console.error('Error during call post:', error);
      return next(new AppError('Error saving call to stack in to the database', 500));
    }
  
    if (!newCall) {
      return next(new AppError('Failed to create a new call (Sequelize did not return a new object)', 400));
    }
  
    const result = newCall.toJSON();
  
    return res.status(200).json({
      status: 'success',
      message: 'Successfully posted to Call Stack service.',
      data: result
    });
});

const pullCall = catchAsync(async (req, res, next) => {
  const recentCall = await callStack.findOne({order: [['id', 'DESC']]});

  const result = recentCall.toJSON();

  return res.json({
    status: 'success',
    result,
  });

});

module.exports = { logCall, pullPref, pullWhite, pullPhone, postCall, pullCall };