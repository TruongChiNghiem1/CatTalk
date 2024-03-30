const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const User = require("../models/user.js");
dotenv.config()

const { SECRET_CODE } = process.env;

const checkLogin = async (req, res, next) => {
    try {
        // Find token from headers
        const bearToken = req.headers.authorization
        if (!bearToken) {
            throw new Error("You are not logged in")
        }
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new Error("Empty Token!")
        }
        // Decode token
        const decoded = jwt.verify(token, SECRET_CODE)
        // Firn user from token.payload decoded 
        const user = await User.findOne({ userName: decoded.username })
        // Check role
        if (!user) {
            throw new Error("You are not authorized to access this")
        }
        next()
    } catch (error) {
        console.log(error);
        return res.json({
            status: 402,
            message: error.message || "You have no rights!"
        })
    }
}

module.exports = checkLogin