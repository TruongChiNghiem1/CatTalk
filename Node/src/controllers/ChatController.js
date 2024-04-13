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
            const member = await Member.find({ userName: username, chatId: chat._id })
            if(member){
                const message = await Message.findOne(
                    {chatId: chat._id}
                ).sort({ createdAt: -1 })
                if (chat.chatType === 'single') {
                    for(const mem of member){
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

const createThisGroup = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username

        const dataAddGroup = req.body
        let createChat = createChatGroup(username, dataAddGroup)

        if(createChat){
            return res.json({
                status: 200,
                message: 'Create group is successful',
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: error
        });
    }
}

const createChatGroup = async (username, dataAddGroup) => {
    //Tạo chat
    try {
        const newChat = {
            chatType: 'multi',
            groupName: dataAddGroup.nameGroup,
            lead: username,
            // avatar: username,
            createdBy: username,
        }
        const chat = await Chat.create(newChat)
        if (!chat) {
            return res.json({
                status: 500,
                message: "Can't create chat, please try again",
            })
        }

        var newMemberGroup = [{
            chatId: chat._id,
            userName: username,
            notifyType: 1,
            chatType: 'multi',
            createdBy: username,
        }];
        dataAddGroup.userNameAdd.forEach(async (usrAdd) => {
            var newMember = {
                chatId: chat._id,
                userName: usrAdd,
                notifyType: 1,
                chatType: 'multi',
                createdBy: username,
            }
            newMemberGroup.push(newMember)
        });

        const member = await Member.create(newMemberGroup)

        if (!member) {
            return res.json({
                status: 500,
                message: "Can't create chat, please try again",
            })
        }

        const nameUser = await User.findOne({userName: username})
        const fullNameUser = nameUser.firstName + ' ' + nameUser.lastName

        const newMessage = {
            chatId: chat._id,
            userName: username,
            typeMessage: 0,
            content: `${fullNameUser} has added you to the group`,
            createdBy: username,
        }

        const message = await Message.create(newMessage)

        if (!message) {
            return res.json({
                status: 500,
                message: "Can't create chat, please try again",
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: error
        });
    }

}

module.exports = { getAllChat, getMessage,createThisGroup }
