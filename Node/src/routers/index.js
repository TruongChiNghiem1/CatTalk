const express = require('express');
const routerUser = require('./user');

const router = express.Router();

router.use('/user', routerUser);

module.exports = router;