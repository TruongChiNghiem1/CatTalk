const express = require('express');
const { getAllChat} = require('../controllers/ChatController')
const checkLogin = require('../middlewares/auth');
const app = express();
const routerChat = express.Router();
//Sign up
app.use(checkLogin)
routerChat.get('/all-chat', getAllChat)

module.exports = routerChat;