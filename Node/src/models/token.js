const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    }
},
    {
        timestamps: true,
        versionKey: false,
    }
);

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token; 