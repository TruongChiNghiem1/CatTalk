const express = require('express');
const { 
    getAllChat, 
    getMessage, 
    createThisGroup,
    createNewMemberGroup,
    deleteMember,
    getMemberInGroup,
    deleteMessage
} = require('../controllers/ChatController')
const checkLogin = require('../middlewares/auth');
const app = express();
const routerChat = express.Router();
//Sign up
app.use(checkLogin)
routerChat.get('/all-chat', getAllChat)
routerChat.get('/get-member-in-group', getMemberInGroup)
routerChat.get('/get-message', getMessage)
routerChat.post('/create-this-group', createThisGroup)
routerChat.post('/create-new-member-group', createNewMemberGroup)
routerChat.post('/delete-member', deleteMember)
routerChat.post('/delete-message', deleteMessage)

module.exports = routerChat;