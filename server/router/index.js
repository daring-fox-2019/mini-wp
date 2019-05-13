const express = require('express');
const router = express.Router();

const register = require('./register');
const login = require('./login');
const google = require('./google');
const user = require('./user');
const articles = require('./articles');
const tags = require('./tags');

router.use('/register', register);
router.use('/login', login);
router.use('/oauth/google', google);

router.use('/user', user);
router.use('/articles', articles);
router.use('/tags', tags);


module.exports = router;