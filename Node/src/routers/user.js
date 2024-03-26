const express = require('express');
const { signUp, mailConfirm, authEmail, signIn, editProfile, getFriends, uploadAvatar, 
    updateAboutUs, uploadBackground, searchUser, testData, changeTheme } = require('../controllers/UserController');
const checkLogin = require('../middlewares/auth');
// const uploadImage = require('../middlewares/uploadImage')
const app = express();
const routerUser = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage(); // Lưu trữ tệp tin trong bộ nhớ
const upload = multer({ storage: storage });
//Sign up
routerUser.post('/mail-confirm', mailConfirm)
routerUser.post('/signup', signUp);
routerUser.post('/auth-mail', authEmail)

// Log in 
routerUser.post('/login', signIn)
app.use(checkLogin)
routerUser.post('/edit-profile', editProfile)
routerUser.post('/upload-avatar', upload.single('avatar'), uploadAvatar)
routerUser.post('/upload-background', upload.single('background'), uploadBackground)
routerUser.post('/update-about-us', updateAboutUs)
routerUser.get('/search', searchUser)
routerUser.get('/change-theme', changeTheme)
routerUser.get('/test-data', testData)

//Add friend
routerUser.get('/get-friends', getFriends)


module.exports = routerUser;