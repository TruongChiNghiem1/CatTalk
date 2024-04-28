const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    /**
     * 0. Hệ thống
     * 1. tin nhắn text
     * 2. image
     * 3. video
     * 4. url
     * 5. sticker
     * 6. voice
     */
    typeMessage: {
        type: String,
    },
    content: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    messageRecovery: {
        type: mongoose.Schema.Types.Number,
    },
    createdBy: {
        type: String,
    }
}, {
    timestamps: true,
    versionKey: false,
});

const Message = mongoose.model("Message", chatSchema);

module.exports = Message;