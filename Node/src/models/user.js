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
    birthday: {
        type: Date,
        required: false,
    },
    hometown: {
        type: String,
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
        default: "https://cattalkfile.s3.ap-southeast-1.amazonaws.com/cattalk_avatar_default.jpg"
    },
    background: {
        type: String,
        default: "https://cattalkfile.s3.ap-southeast-1.amazonaws.com/cattalk_default_background.png"
    },
    hobbies: {
        type: Array,
        default: []
    },
    friends: {
        type: Array,
        default: []
    },
    description: {
        type: String,
    },
    nightMode: {
        type: Number,
        default: 0
    },
    isFriend: {
        type: Number,
    },
    inThisGroup: {
        type: Number,
    },
    private: {
        type: Number, 
        default: 0
    }
},
    {
        timestamps: true,
        versionKey: false,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;