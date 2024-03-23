const express = require('express');
const routerUser = require('./user');
const routerNotify = require('./notify');
const routerChat = require('./chat');
const router = express.Router();

router.use('/user', routerUser);
router.use('/notify', routerNotify);
router.use('/chat', routerChat);
module.exports = router;