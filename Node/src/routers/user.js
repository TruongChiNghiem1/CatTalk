const express = require('express');
const { signUp, mailConfirm, authEmail, listenEvents, signIn, editProfile } = require('../controllers/UserController');
const checkLogin = require('../middlewares/auth');
const app = express();
const routerUser = express.Router();
//Sign up
routerUser.post('/mail-confirm', mailConfirm)
routerUser.post('/signup', signUp);
routerUser.get('/auth-mail', authEmail)
routerUser.get('/events',listenEvents)

// Log in 
routerUser.post('/login', signIn)
app.use(checkLogin)
routerUser.post('/edit-profile', editProfile)

module.exports = routerUser;

