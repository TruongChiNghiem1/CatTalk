const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const Chat = require('../models/chat.js')
const Member = require('../models/member.js')
const Message = require('../models/message.js')

const { SECRET_CODE } = process.env
const getAllChat = async (req, res) => {
    try {
        console.log('dsf');
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username

        const member = await Member.find({ userName: username })

        let chats = []
        for (const mem of member) {
            const chat = await Chat.findOne({ _id: mem.chatId })
            const message = await Message.findOne(
                {chatId: chat._id}
            ).sort({ createdAt: -1 })
            if (mem.chatType === 'single') {
                const userChat = await User.findOne(
                    {userName: mem.createdBy}
                )
                const newChat = {
                    member: mem,
                    objectChat: userChat,
                    newMessage: message
                }
                chats.push(newChat)
            } else {
                const newChat = {
                    member: mem,
                    objectChat: chat,
                    newMessage: message
                }
                chats.push(newChat)
            }
        }

        if (chats) {
            return res.json({
                status: 200,
                chat: chats,
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            message: error,
        })
    }
}

module.exports = { getAllChat }
