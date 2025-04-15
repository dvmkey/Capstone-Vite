const { authentication, restrictTo } = require('../controller/authController');
const { getAllUser, pullCall, setPreferences, setWhitelist, setPhoneNumber } = require('../controller/userController');

const router = require('express').Router();

router.route('/').get(authentication, restrictTo('0'), getAllUser);

router.route('/pull-call').post(pullCall);

router.route('/set-preferences').post(setPreferences);

router.route('/set-white').post(setWhitelist);

router.route('/set-phone').post(setPhoneNumber);

module.exports = router;