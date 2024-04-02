const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    /**
     * 0. Tắt thông báo
     * 1. Bật thông báo
     */
    notifyType: {
        type: mongoose.Schema.Types.Number,
    },
    /**
     * single
     * multi
     */
    chatType: {
        type: String,
    },
    // để biết được ai thêm user này vào group
    createdBy: {
        type: String,
    }
},
    {
        timestamps: true,
        versionKey: false,
    }
);

const Chat = mongoose.model("Member", chatSchema);

module.exports = Chat; 