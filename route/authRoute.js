const { signup, login, logCall, pullCall } = require('../controller/authController');

const router = require('express').Router();

router.route('/signup').post(signup);

router.route('/login').post(login);

router.route('/log-call').post(logCall);

router.route('/log-call').get(pullCall);

module.exports = router;