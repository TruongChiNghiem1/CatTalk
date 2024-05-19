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
    },
    avatar: {
        type: String,
        default: 'https://cattalkfile.s3.ap-southeast-1.amazonaws.com/cattalk_avatar_default.jpg'
    },
    firstName: {
        type: String,
    },
    
    lastName: {
        type: String
    },
    /**
     * 0. Không thông báo mới ở chatId của user này
     * 1. Có thông báo mới ở chatId của user này
     */
    isNewChat: {
        type: mongoose.Schema.Types.Number,
    },
},
    {
        timestamps: true,
        versionKey: false,
    }
);

const Chat = mongoose.model("Member", chatSchema);

module.exports = Chat; 