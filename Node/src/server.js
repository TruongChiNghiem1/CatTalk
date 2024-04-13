const express = require('express')
const app = express()
const dotenv = require('dotenv')
const { connect } = require('mongoose')
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
connect(URI_DB)

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
        origin: `http://localhost:5173`,
        methods: ['GET', 'POST'],
    },
})
let activeUsers = [];
io.on('connection', (socket) => {
    socket.on('join_room', (data) => {
        // socket.join(data)
        if (data && !activeUsers.some((user) => user.userId === data)) {
            activeUsers.push({ userId: data, socketId: socket.id });
            console.log("New User Connected", activeUsers);
        }
    })

    socket.on('message', async (data) => {
        try {
            const { chatId, senderId, receiverId, newMessageSend } = data
            console.log(chatId, senderId, receiverId, newMessageSend);
            const newMessage = await Message.create({
                chatId: chatId,
                createdBy: senderId,
                userName: receiverId,
                content: newMessageSend
            })

            const datasend = { chatId: chatId, createdBy: senderId, userName: receiverId, content: newMessageSend, createdAt: newMessage.createdAt };
            //emit the message to the receiver
            // socket.to(chatId).emit('receiveMessage', newMessage)
            const user = activeUsers.find((user) => user.userId === receiverId);
            console.log("Sending from socket to :", receiverId)
            console.log("Data: ", datasend)
            if (user) {
                console.log('aaaaaa');
                io.to(user.socketId).emit("receiveMessage", datasend);
            }
        } catch (error) {
            console.log(error)
            console.log('Error handling the messages')
        }
        socket.on('disconnect', () => {
            activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
            console.log("User Disconnected", activeUsers);
        })
    })
})

http.listen(PORT_SOCKET, () => {
    console.log('Socket.IO server running on port 2090')
})

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
