const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const Chat = require('../models/chat.js')
const Member = require('../models/member.js')
const Message = require('../models/message.js')
const DeleteMessage = require('../models/DeleteMessage.js')
const DeleteChat = require('../models/deleteChat.js')
const { Mongoose } = require('mongoose')
const { connect, default: mongoose } = require('mongoose')

const { SECRET_CODE } = process.env
const getAllChat = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username
        
        const deletedChat = await DeleteChat.find({ 
            userName: username,
        })

        var deletedChatIds = [];

        for (const deleteChatItem of deletedChat) {
            try {
                const deletedMessage = await DeleteMessage.find({ 
                chatId: deleteChatItem.chatId,
                userName: username,
                });
                const deletedMessageIds = deletedMessage.map(deletedMessage => new mongoose.Types.ObjectId(deletedMessage.messageId));
                var messages = '';
                messages = await Message.aggregate([
                    { 
                        $match: { 
                            chatId: deleteChatItem.chatId, 
                            _id: { $nin: deletedMessageIds },
                            createdAt: {
                                $gt: deleteChatItem.updatedAt
                            }
                        } 
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'createdBy',
                            foreignField: 'userName',
                            as: 'user'
                        }
                    },
                    {
                        $sort: {
                        updatedAt: -1
                        }
                    },
                    {
                        $limit: 1
                    }
                ]);
                if (!messages || messages == '') {
                    deletedChatIds.push(deleteChatItem.chatId);
                }
            } catch (error) {
                console.error(`Lỗi khi xử lý chatId ${deleteChatItem.chatId}:`, error);
            }
        }

        console.log('aaaaaaaaaaa',deletedChatIds);

        const chatss = await Chat.aggregate([
            { $match: 
                { 
                    _id: {$nin: deletedChatIds} 
                } 
            },
            {
                $lookup: {
                    from: 'members',
                    localField: '_id',
                    foreignField: 'chatId',
                    as: 'members'
                }
            }, {
                $match: {
                    'members.userName': username
                }
            }
        ])
        let chats = []
        for (var chat of chatss) {
            let memberChat = await Member.aggregate([
                {$match: {chatId: chat._id, userName: {$ne: username}}},
                {$lookup: {
                    from: 'users',
                    localField: 'userName',
                    foreignField: 'userName',
                    as: 'user'
                }},
                {$project: {
                    userName: 1,
                    createdBy: 1,
                    notifyType: 1,
                    chatType: 1,
                    chatId: 1,
                    isNewChat: 1,
                    firstName: { $arrayElemAt: ['$user.firstName', 0]},
                    lastName: { $arrayElemAt: ['$user.lastName', 0]},
                    avatar: { $arrayElemAt: ['$user.avatar', 0]},
                    friends: { $arrayElemAt: ['$user.friends', 0]},
                    userId: { $arrayElemAt: ['$user._id', 0] },
                }}
            ])

            const deletedMessage = await DeleteMessage.find({ 
                chatId: chat._id,
                userName: username,
            })
            const deletedMessageIds = deletedMessage.map(deletedMessage => new mongoose.Types.ObjectId(deletedMessage.messageId));

            const message = await Message.findOne(
                { 
                    chatId: chat._id, 
                    _id: {$nin: deletedMessageIds}
                }
            ).sort({ createdAt: -1 })

            if(message){
                const newChat = {
                    member: memberChat,
                    objectChat: chat,
                    newMessage: message,
                    // createdAtMessage: message.createdAt
                }
                chats.push(newChat)
            }
        }

        chats.sort((createdAtA, createdAtB) => createdAtB.newMessage.createdAt - createdAtA.newMessage.createdAt)
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

const getOneChat = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const myUsername = decoded.username
        const {userChat} = req.query
        
        const chat = await Chat.aggregate([
            {
                $lookup: {
                    from: 'members',
                    localField: '_id',
                    foreignField: 'chatId',
                    as: 'members'
                }
            },
            {
                $match: {
                    'members.userName': { $all: [myUsername, userChat] },
                    'members.chatType': 'single'
                }
            }
        ]);
        let memberChat = await Member.aggregate([
            {$match: {chatId: chat[0]._id, userName: {$ne: myUsername}}},
            {$lookup: {
                from: 'users',
                localField: 'userName',
                foreignField: 'userName',
                as: 'user'
            }},
            {$project: {
                userName: 1,
                createdBy: 1,
                notifyType: 1,
                chatType: 1,
                chatId: 1,
                isNewChat: 1,
                firstName: { $arrayElemAt: ['$user.firstName', 0]},
                lastName: { $arrayElemAt: ['$user.lastName', 0]},
                avatar: { $arrayElemAt: ['$user.avatar', 0]},
                friends: { $arrayElemAt: ['$user.friends', 0]}
            }}
        ])
        const newChat = {
            member: memberChat,
            objectChat: chat[0],
        }
        if (newChat) {
            return res.json({
                status: 200,
                chat: newChat,
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
        const newChat = {
            chatType: 'multi',
            groupName: (dataAddGroup.nameGroup && dataAddGroup.nameGroup != '' ?  dataAddGroup.nameGroup : 'Nhóm của ' + username),
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

        const nameUser = await User.findOne({ userName: username })
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
        }else{
            return res.json({
                newChat: chat,
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


const createNewMemberGroup = async (req, res) => {
    //Tạo chat
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username
        
        const {userNameAdd, chatId} = req.body

        if(userNameAdd){
            var newMemberGroup = [];
            var newMessageGroup = [];
            await Promise.all(userNameAdd.map(async (usrAdd) => {
              var newMember = {
                chatId: chatId,
                userName: usrAdd,
                notifyType: 1,
                chatType: 'multi',
                createdBy: username,
              };
              newMemberGroup.push(newMember);
              console.log('Nghiem khung 1');
            
              const nameUser = await User.findOne({ userName: username });
              const fullNameUser = nameUser.firstName + ' ' + nameUser.lastName;
              const nameUserAdd = await User.findOne({ userName: usrAdd });
              const fullNameUserAdd = nameUserAdd.firstName + ' ' + nameUserAdd.lastName;
              console.log('Nghiem yeu Nguyen Meo');
              var newMessage = {
                chatId: chatId,
                userName: username,
                typeMessage: 0,
                content: `${fullNameUser} has just added ${fullNameUserAdd} to the group`,
                createdBy: username,
              };
            
              newMessageGroup.push(newMessage);
            }));
            
            console.log('message', newMessageGroup);
            const member = await Member.create(newMemberGroup)
            console.log(member);
            if (!member) {
                return res.json({
                    status: 500,
                    message: "Can't create member chat, please try again",
                })
            }

            console.log(newMessageGroup);
            const message = await Message.create(newMessageGroup)

            if (!message) {
                return res.json({
                    status: 500,
                    message: "Can't create message chat, please try again",
                })
            }

            const http = require("http");
            const express = require("express");
            const app = express();
            const server = http.createServer(app);
            const io = require("socket.io")(server, {
                cors: {
                    origin: "http://localhost:3000",
                    methods: ["GET", "POST"],
                    allowedHeaders: ["my-custom-header"],
                    credentials: true,
                },
            });
            io.on("connection", (socket) => {
                userNameAdd.forEach(async (usrAdd) => {
                    const nameUser = await User.findOne({userName: username})
                    const fullNameUser = nameUser.firstName + ' ' + nameUser.lastName
                    const nameUserAdd = await User.findOne({userName: usrAdd})
                    const fullNameUserAdd = nameUserAdd.firstName + ' ' + nameUserAdd.lastName

                    var newMessage = {
                        chatId: chatId,
                        userName: username,
                        typeMessage: 0,
                        content: `${fullNameUser} has just added ${fullNameUserAdd} to the group`,
                        createdBy: username,
                    }

                    const datasend = { chatId: chatId, createdBy: username, content: newMessage };
                    socket.broadcast
                        .to(chatId)
                        .emit("receiveMessage", datasend);
                })
            });
        }
        
        return res.json({
            status: 200,
            message: 'Add user is success',
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: error
        });
    }

}


const deleteMember = async (req, res) => {
    try {
        const { chatId, userNameDelete } = req.body

        const memberDelete = await Member.deleteOne({ chatId: chatId,userName: userNameDelete })

        if (!memberDelete) {
            return res.json({
                status: 500,
                message: "Can't delete member, please try again",
            })
        }
        return res.json({
            status: 200,
            message: 'Delete successful member',
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const deleteMessage = async (req, res) => {
    try {

        const { chatId, data, myUserName } = req.body

        const deleteMessage = await DeleteMessage.create({
            userName: myUserName,
            messageId: data._id,
            chatId: chatId,
        })
        if (!deleteMessage) {
            return res.json({
                status: 500,
                message: "Can't delete message, please try again",
            })
        }
        return res.json({
            status: 200,
            message: 'Delete successful message',
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const deleteChat = async (req, res) => {
    try {
        const { dataChatDelete } = req.body
        const {myUserName, chatId} = dataChatDelete;
        // Kiểm tra xem đã có bản ghi trong bảng DeleteChat chưa
        const existingRecord = await DeleteChat.findOne({ 
            userName: myUserName,
            chatId: chatId 
        });
        const deleteChatItem = [];
        if (existingRecord) {
            // Nếu đã có bản ghi, cập nhật trường updatedAt
            deleteChatItem = await existingRecord.update({ updatedAt: new Date() });
        } else {
            // Nếu chưa có bản ghi, tạo mới
            deleteChatItem = await DeleteChat.create({ 
                userName: myUserName,
                chatId: chatId
            });
        }

        if (!deleteChatItem) {
            return res.json({
                status: 500,
                message: "Can't delete member, please try again",
            })
        }
        return res.json({
            status: 200,
            message: 'Delete successful member',
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}
const getMemberInGroup = async (req, res) => {
    try {
        const { chatId } = req.query
        // const getMember = await Member.find({ chatId: chatId })
        const chatIdObject = new mongoose.Types.ObjectId(chatId);
        let memberChat = await Member.aggregate([
            {$match: {chatId: chatIdObject}},
            {$lookup: {
                from: 'users',
                localField: 'userName',
                foreignField: 'userName',
                as: 'user'
            }},
            {$project: {
                userName: 1,
                createdBy: 1,
                notifyType: 1,
                chatType: 1,
                chatId: 1,
                firstName: { $arrayElemAt: ['$user.firstName', 0]},
                lastName: { $arrayElemAt: ['$user.lastName', 0]},
                avatar: { $arrayElemAt: ['$user.avatar', 0]},
                friends: { $arrayElemAt: ['$user.friends', 0]}
            }}
        ])
        if (!memberChat) {
            return res.json({
                status: 500,
                message: "Can't get member, please try again",
            })
        }
        return res.json({
            status: 200,
            member: memberChat,
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}
module.exports = { 
    getAllChat, 
    getMessage,
    createThisGroup,
    createNewMemberGroup,
    deleteMember,
    getMemberInGroup,
    deleteMessage,
    getOneChat,
    deleteChat
 }