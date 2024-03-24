const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chatType: {
        type: String,
        required: true,
    },
    groupName: {
        type: String,
        required: true,
    },
    lead: {
        type: String,
    },
    avatar: {
        type: String,
        default: "https://cdn.vectorstock.com/i/1000x1000/09/81/cute-cat-face-feline-cartoon-animal-icon-vector-30080981.webpw"
    },
    createdBy: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
        versionKey: false,
    }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat; 