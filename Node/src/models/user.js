const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: false,
    },
    age: {
        type: Number,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
        default: "https://cdn.vectorstock.com/i/1000x1000/09/81/cute-cat-face-feline-cartoon-animal-icon-vector-30080981.webpw"
    },
},
    {
        timestamps: true,
        versionKey: false,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;