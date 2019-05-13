const express = require('express');
const router = express.Router();

const TagController = require('../../controllers/tag');

router.get('/', TagController.findAll);

module.exports = router;