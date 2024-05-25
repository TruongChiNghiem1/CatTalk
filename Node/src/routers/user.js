const express = require('express')
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
    changeTheme,
    addFriend,
    getMyUser,
    checkAuth,
    deleteFriend,
    changePassword,
    getFriendAddGroup,
    getUser,
    searchFriend,
    uploadAvatarMobile,
    getInfoOtherUser,
    changePrivateProfile
} = require('../controllers/UserController')
const checkLogin = require('../middlewares/auth')
// const uploadImage = require('../middlewares/uploadImage')
const app = express()
const routerUser = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage() // Lưu trữ tệp tin trong bộ nhớ
const upload = multer({ storage: storage })
//Sign up
routerUser.post('/mail-confirm', mailConfirm)
routerUser.post('/signup', signUp)
routerUser.post('/auth-mail', authEmail)

// Log in
routerUser.post('/login', signIn)
app.use(checkLogin)
routerUser.get('/check-auth', checkAuth)
routerUser.post('/edit-profile', editProfile)
routerUser.post('/upload-avatar', upload.single('avatar'), uploadAvatar)
routerUser.post('/upload-avatar-mobile', uploadAvatarMobile)
routerUser.post(
    '/upload-background',
    upload.single('background'),
    uploadBackground
)
routerUser.post('/update-about-us', updateAboutUs)
routerUser.get('/search', searchUser)
routerUser.get('/change-theme/:nightMode', changeTheme)
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
routerUser.post('/get-info-other-user', getInfoOtherUser)
routerUser.post('/change-private-user', changePrivateProfile)


module.exports = routerUser
