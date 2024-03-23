const express = require('express');
<<<<<<< HEAD
const { signUp, mailConfirm, authEmail, listenEvents, signIn, testData } = require('../controllers/UserController');

=======
const { signUp, mailConfirm, authEmail, listenEvents, signIn, editProfile } = require('../controllers/UserController');
const checkLogin = require('../middlewares/auth');
const app = express();
>>>>>>> main
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

routerUser.get('/test-data', testData)

module.exports = routerUser;