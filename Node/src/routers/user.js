const express = require('express');
const { signUp, mailConfirm, authEmail, listenEvents, signIn } = require('../controllers/UserController');

const routerUser = express.Router();
//Sign up
routerUser.post('/mail-confirm', mailConfirm)
routerUser.post('/signup', signUp);
routerUser.get('/auth-mail', authEmail)
routerUser.get('/events',listenEvents)

// Log in 
routerUser.post('/login', signIn)

module.exports = routerUser;

