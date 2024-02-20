const express = require('express');
const signUp = require('../controllers/UserController');
const mailConfirm = require('../controllers/UserController');

const routerUser = express.Router();
routerUser.post('/mail-confirm', mailConfirm)
routerUser.post('/signup', signUp);


module.exports = routerUser;

