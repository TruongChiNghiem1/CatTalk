const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const Chat = require('../models/chat.js')
const Member = require('../models/member.js')
const Message = require('../models/message.js')

const { SECRET_CODE } = process.env
const getAllChat = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username

        
        const chatss = await Chat.find()
        let chats = []
        for (const chat of chatss) {
            let member = await Member.find({ userName: username, chatId: chat._id })
           
            if(member){
                const message = await Message.findOne(
                    {chatId: chat._id}
                ).sort({ createdAt: -1 })
                if (chat.chatType === 'single') {
                    for(const mem of member){
                        const detailMember = await User.findOne({ userName: mem.userName })
                        mem.firstName = detailMember.firstName;
                        mem.lastName = detailMember.lastName
                        mem.avatar = detailMember.avatar

                        if(mem.createdBy !== username){
                            const userChat = await User.findOne(
                                {userName: mem.createdBy}
                            )
                            const newChat = {
                                member: member,
                                userChat: userChat,
                                objectChat: chat,
                                newMessage: message
                            }
                            chats.push(newChat)
                        }
                    }
                } else {
                    const newChat = {
                        member: member,
                        userChat: [],
                        objectChat: chat,
                        newMessage: message
                    }
                    chats.push(newChat)
                }
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

const getMessage = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username

        const member = await Member.find({ userName: username })
        const {objectChat} = req.query

        const message = await Message.find({chatId: objectChat})
        .sort({createdAt: -1});
console.log('a');
        if (message) {
            return res.json({
                status: 200,
                message: message,
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

module.exports = { getAllChat, getMessage }
