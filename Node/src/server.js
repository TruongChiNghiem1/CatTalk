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
app.use(cors())

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/cattalk', router)

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

const http = require('http').createServer(app)
const io = new Server(http, {
    cors: {
        origin: `http://localhost:${PORT_SOCKET}`,
        methods: ['GET', 'POST'],
    },
})

io.on('connection', (socket) => {
    console.log(`a user is connected ${socket.id}`)

    socket.on('join_room', (data) => {
        socket.join(data)
    })

    socket.on('message', async (data) => {
        try {
            const { chatId, senderId, receiverId, newMessageSend } = data
            const newMessage = await Message.create({
                chatId: chatId,
                createdBy: senderId,
                userName: receiverId,
                content: newMessageSend,
            })

            //emit the message to the receiver
            socket.to(chatId).emit('receiveMessage', newMessage)
        } catch (error) {
            console.log(error)
            console.log('Error handling the messages')
        }
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })
})

http.listen(PORT_SOCKET, () => {
    console.log('Socket.IO server running on port 2090')
})

app.post('/messages', async (req, res) => {
    try {
        const { senderId, receiverId } = req.body
        console.log(senderId, receiverId);
        const messages = await Message.find({
            $or: [
                { createdBy: senderId, userName: receiverId },
                { createdBy: receiverId, userName: senderId },
            ],
        })
        // .populate('senderId', '_id name')
        res.status(200).json({messages: messages})
    } catch (error) {
        console.log(error);
        res.status(200).json({error: error})
    }
})
