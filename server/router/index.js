const express = require('express');
const router = express.Router();

const register = require('./register');
const login = require('./login');
const google = require('./google');
const user = require('./user');
const articles = require('./articles');

router.use('/register', register);
router.use('/login', login);
router.use('/oauth/google', google);

router.use('/user', user);
router.use('/articles', articles);


module.exports = router;