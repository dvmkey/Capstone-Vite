const { logCall, pullPref, pullWhite, pullPhone, postCall, pullCall } = require('../controller/appController');

const router = require('express').Router();

router.route('/log-call').post(logCall);

router.route('/pull-pref').post(pullPref);

router.route('/pull-white').post(pullWhite);

router.route('/pull-phone').post(pullPhone);

router.route('/post-call').post(postCall);

router.route('/pull-call').post(pullCall);

module.exports = router;