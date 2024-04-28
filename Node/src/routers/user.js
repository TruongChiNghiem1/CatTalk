const express = require('express');
const { 
    signUp, 
    mailConfirm, 
    authEmail, 
    signIn, 
    editProfile, 
    getFriends, 
    uploadAvatar,
    updateAboutUs, 
    uploadBackground, 
    searchUser, 
    testData, 
    changeTheme, 
    addFriend, 
    getMyUser, 
    checkAuth, 
    deleteFriend, 
    changePassword,
    getFriendAddGroup,
    getUser,
    searchFriend
} = require('../controllers/UserController');
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
routerUser.get('/check-auth', checkAuth)
routerUser.post('/edit-profile', editProfile)
routerUser.post('/upload-avatar', upload.single('avatar'), uploadAvatar)
routerUser.post('/upload-background', upload.single('background'), uploadBackground)
routerUser.post('/update-about-us', updateAboutUs)
routerUser.get('/search', searchUser)
routerUser.get('/change-theme/:nightMode', changeTheme)
routerUser.get('/test-data', testData)
routerUser.post('/change-password', changePassword)

//Add friend
routerUser.get('/get-friends', getFriends)
routerUser.get('/get-user', getUser)
routerUser.get('/get-friend-add-group', getFriendAddGroup)
routerUser.get('/search-friend', searchFriend)
routerUser.get('/search', searchUser)
routerUser.post('/add-friend', addFriend)
routerUser.post('/delete-friend', deleteFriend)
routerUser.post('/user-find-one', getMyUser)



module.exports = routerUser;