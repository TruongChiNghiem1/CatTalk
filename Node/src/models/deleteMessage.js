const mongoose = require('mongoose');

const deleteMessageSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    messageId: {
        type: mongoose.Schema.Types.ObjectId,
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

const DeleteMessage = mongoose.model("DeleteMessage", deleteMessageSchema);

module.exports = DeleteMessage; 