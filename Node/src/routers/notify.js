const express = require('express');
const { getAllNotify, deleteNotify} = require('../controllers/NotifyController')
const checkLogin = require('../middlewares/auth');
const app = express();
const routerNotify = express.Router();
//Sign up
app.use(checkLogin)
routerNotify.get('/all-notify', getAllNotify)
routerNotify.post('/delete-notify', deleteNotify);

module.exports = routerNotify;