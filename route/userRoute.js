const { authentication, restrictTo } = require('../controller/authController');
const { getAllUser, pullCall, setPreferences } = require('../controller/userController');

const router = require('express').Router();

router.route('/').get(authentication, restrictTo('0'), getAllUser);

router.route('/pull-call').post(pullCall);

router.route('/set-preferences').post(setPreferences);

module.exports = router;