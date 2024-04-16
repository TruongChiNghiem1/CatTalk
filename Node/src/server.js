const express = require('express')
const app = express()
const dotenv = require('dotenv')
const { connect, default: mongoose } = require('mongoose')
const cors = require('cors')
const router = require('./routers')
// const routerSocket = require('./routers/socket')
const bodyParser = require('body-parser')
dotenv.config()
const PORT = process.env.PORT
const PORT_SOCKET = process.env.PORT_SOCKET
const URI_DB = process.env.URI_DB
const Message = require('./models/message')
const { Server } = require("socket.io");
const { addUser, removeUser } = require("./models/userAddGroup");
const s3 = require('./config/aws-helper.js')
connect(URI_DB)
const fs = require('fs');

app.use(cors({ credentials: true }))

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

const http = require('http').createServer(app)
const io = new Server(http, {
    cors: {
        origin: `http://localhost:${PORT_SOCKET}`,
        origin: `http://localhost:2080`,
        origin: `http://localhost:5173`,
        methods: ['GET', 'POST'],
    },
})
let activeUsers = [];
io.on('connection', (socket) => {
    socket.on('join_room', ({chatIdJoin, userNameJoin}) => {
        const { user, error } = addUser({ id: socket.id,chatIdJoin: chatIdJoin ,userNameJoin: userNameJoin });
        console.log(user);
        console.log("New User Connected", user);
        // if (data.userId && !activeUsers.some((user) => user.userId === data.userName && user.chatId !== data.chatId)) {
        //     activeUsers.push({ chatId: data.chatId, userId: data.userName, socketId: socket.id });
            
        // }

        socket.on('message', async (data) => {
            try {
                const { chatId, senderId, newMessageSend, typeMessage } = data
                const newMessage = await Message.create({
                    chatId: chatId,
                    createdBy: senderId,
                    // userName: receiverId,
                    content: newMessageSend,
                    typeMessage: typeMessage
                })

                const datasend = { chatId: chatId, createdBy: senderId, content: newMessageSend, createdAt: newMessage.createdAt };
                //emit the message to the receiver
                // socket.to(chatId).emit('receiveMessage', newMessage)
                // const user = activeUsers.find((user) => user.userId == receiverId);
                if (user) {
                    io.to(user.chatIdJoin).emit("receiveMessage", datasend);
                }
            } catch (error) {
                console.log(error)
                console.log('Error handling the messages')
            }
            
        })

        socket.on('messageImage', async (data, params) => {
            try {
                const { chatId, senderId, receiverId, newMessageSend } = params
                const base64String = newMessageSend[0].base64; // Truy cập vào trường base64 trong mảng

                const bufferData = Buffer.from(base64String, 'base64'); // Chuyển đổi từ chuỗi base64 sang đối tượng Buffer
                const filePath = generateUniqueFileName(); 
                const paramsS3 = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: filePath,
                    Body: bufferData,
                    ContentType: data.type,
                }

                s3.upload(paramsS3, async (err, data) => {
                    if (err) {
                        console.log('Upload fail', err)
                        return res.json({
                            status: 500,
                            message: 'Server cannot save your image, try again!',
                        })
                    } else {
                        const newMessage = await Message.create({
                            chatId: chatId,
                            createdBy: senderId,
                            // userName: receiverId,
                            content: data.Location,
                            typeMessage: 2
                        })

                        const datasend = { 
                            chatId: chatId, 
                            createdBy: senderId, 
                            userName: receiverId, 
                            content: data.Location,
                            createdAt: newMessage.createdAt, 
                            typeMessage: 2 };
                        //emit the message to the receiver
                        // socket.to(chatId).emit('receiveMessage', newMessage)
                        // const user = activeUsers.find((user) => user.userId == receiverId);
                        if (user) {
                            console.log('Received message');
                            io.to(user.chatIdJoin).emit("receiveMessage", datasend);
                        }
                    }
                })

            } catch (error) {
                console.log(error)
                console.log('Error handling the messages')
            }
        })
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        console.log("User Disconnected ",user);
        // activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        // console.log("User Disconnected", activeUsers);
    })

    console.log(activeUsers);
})

http.listen(PORT_SOCKET, () => {
    console.log('Socket.IO server running on port 2090')
})

function generateUniqueFileName() {
    const timestamp = new Date().getTime(); // Get the current timestamp
    const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
    const fileName = `${timestamp}-${randomString}.jpg`; // Create the file name using the timestamp and random string
  
    return fileName;
  }

app.post('/messages', async (req, res) => {
    try {
        const { senderId, receiverId } = req.body
        const messages = await Message.find({
            $or: [
                { createdBy: senderId, userName: receiverId },
                { createdBy: receiverId, userName: senderId },
            ],
        })

        res.status(200).json({ messages: messages })
    } catch (error) {
        console.log(error);
        res.status(200).json({ error: error })
    }
})

app.post('/messages-group', async (req, res) => {
    try {
        const { senderId, chatId } = req.body
        // const messages = await Message.find({
        //     chatId: chatId
        // })
        const chatIdObject = new mongoose.Types.ObjectId(chatId);
        const messages = await Message.aggregate([
            {$match: {chatId: chatIdObject}},
            {$lookup: {
                from: 'users',
                localField: 'createdBy',
                foreignField: 'userName',
                as: 'user'
            }},
            {
                $project: {
                    chatId: 1,
                    createdBy: 1,
                    typeMessage: 1,
                    content: 1,
                    createdAt: 1,
                    firstName: { $arrayElemAt: ['$user.firstName', 0]},
                    lastName: { $arrayElemAt: ['$user.lastName', 0]},
                    avatar: { $arrayElemAt: ['$user.avatar', 0]},
                }
            }
        ])
        res.status(200).json({ messages: messages })
    } catch (error) {
        console.log(error);
        res.status(200).json({ error: error })
    }
})
