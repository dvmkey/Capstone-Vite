const { signup, login, logCall } = require('../controller/authController');

const router = require('express').Router();

router.route('/signup').post(signup);

router.route('/login').post(login);

router.route('/log-call').post(logCall);

module.exports = router;