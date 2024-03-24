const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Chat = require("../models/chat");

const { SECRET_CODE } = process.env;
const getAllChat = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, SECRET_CODE);
        const username = decoded.username;
        const makeChat = {
            chatType: 'multi',
            groupName: 'GROUP CHAT 01',
            lead: 'adminQuyen',
            avatar: 'https://p1.hiclipart.com/preview/927/112/893/group-of-people-business-company-team-management-customer-project-stakeholder-teamwork-png-clipart.jpg',
            createdBy: 'adminQuyen'
        }

        const chats = await Chat.find()

        if (chats) {
            return res.json({
                status: 200,
                chat: chats
            })
        }

    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: error,
        })
    }
}


module.exports = { getAllChat }