const { logCall } = require('../controller/appController');

const router = require('express').Router();

router.route('/log-call').post(logCall);

module.exports = router;