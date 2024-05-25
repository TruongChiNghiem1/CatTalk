const mongoose = require('mongoose');

const deleteChatSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

},
    {
        timestamps: true,
        versionKey: false,
    }
);

const DeleteChat = mongoose.model("DeleteChat", deleteChatSchema);

module.exports = DeleteChat;