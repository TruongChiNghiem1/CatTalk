const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Notify = require("../models/notify");

const { SECRET_CODE } = process.env;
const getAllNotify = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, SECRET_CODE);
        const username = decoded.username;
        const notifies = await Notify.find({ userName: username })

        if (notifies) {
            return res.json({
                status: 200,
                notifies: notifies
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

const deleteNotify = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, SECRET_CODE);
        const username = decoded.username;
        const ids = Object.keys(req.body)
        const isDel = await Notify.deleteMany({ _id: { $in: ids } });
        if (isDel) {
            const notifies = await Notify.find({ username: username })
            return res.json({
                status: 200,
                notifies: notifies
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

module.exports = { getAllNotify, deleteNotify }