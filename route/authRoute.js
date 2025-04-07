const { signup } = require('../controller/authController.js');

const router = require('express').Router();

router.route('/signup').post(signup);

module.exports = router;