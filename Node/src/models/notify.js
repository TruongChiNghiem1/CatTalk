const mongoose = require('mongoose');

const notifySchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    view: {
        type: String,
    },
    image: {
        type: String,
        default: "https://cdn.vectorstock.com/i/1000x1000/09/81/cute-cat-face-feline-cartoon-animal-icon-vector-30080981.webpw"
    },
},
    {
        timestamps: true,
        versionKey: false,
    }
);

const Notify = mongoose.model("Notify", notifySchema);

module.exports = Notify; 