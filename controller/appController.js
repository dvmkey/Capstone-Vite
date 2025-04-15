const catchAsync = require('../utils/catchAsync');
const callLogs = require('../db/models/call-logs');

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

module.exports = { logCall };