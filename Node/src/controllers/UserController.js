const User = require('../models/user.js')
const Chat = require('../models/chat.js')
const Member = require('../models/member.js')
const Message = require('../models/message.js')
const Notify = require("../models/notify");
const mongoose = require('mongoose');
const {
    signUpValid,
    signInValid,
    updatValid,
} = require('../validations/UserValidation.js')
const bcrypyjs = require('bcryptjs')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const Mailgen = require('mailgen')
const Token = require('../models/token.js')
dotenv.config()
const nodemailer = require('nodemailer')
const s3 = require('../config/aws-helper.js')
const { array } = require('joi')

const { SECRET_CODE, AUTH_MAIL, AUTH_PASS, EXPIRATION_TIME } = process.env
const mailConfirm = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: AUTH_MAIL,
                pass: AUTH_PASS,
            },
        })

        let email = req.body.email
        let checkUser = await User.find({ email: email })
        if (checkUser.length > 0) {
            return res.json({
                status: 500,
                message: 'Email already in use!',
            })
        } else {
            let otp = Math.floor(1000 + Math.random() * 9000)
            const token = await Token.findOneAndUpdate(
                { email: email },
                { otp: otp },
                { upsert: true }
            )
            var mailGenerator = new Mailgen({
                theme: 'default',
                product: {
                    name: 'CATTALK',
                    link: `${req.get('host')}`,
                    logo: 'https://cattalk.id.vn/src/assets/logo_vertical.png?t=1705984018125',
                    logoHeight: '50px',
                },
            })

            var emailConfig = {
                body: {
                    name: 'Newbie',
                    intro: "Welcome to CATTALK! We're very excited to have you on board.",
                    action: {
                        instructions:
                            'To get started with CATTALK, please input this OTP at step three:',
                        button: {
                            color: '#22BC66', // Optional action button color
                            text: `${otp}`,
                            link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010',
                        },
                    },
                    outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
                },
            }

            // Generate an HTML email with the provided contents
            var mail = mailGenerator.generate(emailConfig)

            const mailOptions = {
                from: 'cattalkvn@gmail.com',
                subject: 'Confirm your email address',
                to: email,
                html: mail,
            }

            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    res.json({
                        status: 500,
                        message: 'Error sending verification email.',
                    })
                } else {
                    res.json({
                        status: 200,
                        message: 'Verification email sent.',
                    })
                }
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error,
        })
    }
}

const authEmail = async (req, res) => {
    try {
        const { email, otp } = req.body

        const emailExists = await User.findOne({ email: email, otp: 1 })
        if (emailExists) {
            return res.json({
                status: 500,
                message: 'Email already used',
            })
        }
        const register = await Token.findOne({ email: email })
        if (!register) {
            return res.json({
                status: 500,
                message: 'Submit your mail to continute',
            })
        }

        if (otp == register.otp) {
            //  Creat jwt token
            const token = jwt.sign({ email: email }, SECRET_CODE, {
                expiresIn: '1d',
            })
            return res.json({
                status: 200,
                token: token,
            })
        } else {
            return res.json({
                status: 500,
                message: 'OTP code is invalid',
            })
        }
    } catch (e) {
        console.log(e)
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const signUp = async (req, res) => {
    try {
        // Validation
        const { userName, firstName, lastName, password, token } = req.body
        const decoded = jwt.verify(token, SECRET_CODE)
        const email = decoded.email
        const { error } = signUpValid.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err) => err.message)
            return res.json({
                status: 400,
                message: errors,
            })
        }
        // Check email
        const emailExists = await User.findOne({ email: email, otp: 1 })
        if (emailExists) {
            return res.json({
                status: 500,
                message: 'Email already used',
            })
        }

        //check username
        const userNameExists = await User.findOne({ userName })
        if (userNameExists) {
            return res.json({
                status: 500,
                message: 'Username already used',
            })
        }

        // Hash password
        const hashedPassword = await bcrypyjs.hash(password, 10)

        const user = await User.create({
            userName,
            firstName,
            lastName,
            email,
            password: hashedPassword,
        })
        console.log(user)
        //  Get info for client
        user.password = undefined
        return res.json({
            status: 200,
            message: 'User created successfully',
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const signIn = async (req, res) => {
    try {
        // Validation
        const { userName, password } = req.body
        const { error } = signInValid.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err) => err.message)
            return res.json({
                status: 401,
                message: errors,
            })
        }
        // Check email
        const user = await User.findOne({ userName })
        if (!user) {
            return res.json({
                status: 400,
                message: 'User not found',
            })
        }

        const isMatch = await bcrypyjs.compare(password, user.password)
        if (!isMatch) {
            return res.json({
                status: 400,
                message: 'Invalid credentials',
            })
        }
        //  Creat jwt token
        const token = jwt.sign({ username: user.userName }, SECRET_CODE, {
            expiresIn: '1d',
        })
        //  Return result:
        user.password = undefined

        return res.json({
            status: 200,
            message: 'User logged in successfully',
            user: user,
            accessToken: token,
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const editProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username
        const { error } = updatValid.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err) => err.message)
            return res.json({
                status: 401,
                message: errors,
            })
        }
        const user = await User.findOne({ userName: username })
        if (!user) {
            return res.json({
                status: 400,
                message: 'User not found',
            })
        }

        let profile = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            birthday: req.body.birthday,
            hometown: req.body.hometown,
        }

        const isMatch = await bcrypyjs.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.json({
                status: 500,
                message: 'Invalid credentials',
            })
        }

        const dataUpdate = await User.findOneAndUpdate(
            { userName: username },
            profile,
            { new: false }
        )

        const userNew = await User.findOne({ userName: username })
        if (!dataUpdate) {
            return res.json({
                status: 500,
                message: 'Your information is invalid, please try again',
            })
        }
        return res.json({
            status: 200,
            message: 'Your information has been successfully updated',
            user: userNew,
        })
    } catch (e) {
        console.log(e)
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const getFriends = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username

        const user = await User.findOne({ userName: username }) // Tìm người dùng dựa trên username của bạn

        if (!user) {
            return res.json({
                status: 500,
                message: 'User does not exist!',
            })
        }

        const listFriend = await User.aggregate([
            {
                $match: {
                    userName: { $in: user.friends },
                },
            },
            {
                $addFields: {
                    mutual_friends: {
                        $size: {
                            $setIntersection: ['$friends', user.friends],
                        },
                    },
                    isFriend: 1,
                },
            },
            {
                $project: {
                    userName: 1,
                    firstName: 1,
                    lastName: 1,
                    avatar: 1,
                    background: 1,
                    friends: 1,
                    mutual_friends: 1,
                    isFriend: 1,
                },
            },
        ]);
        return res.json({
            status: 200,
            data: listFriend,
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const uploadAvatar = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username

        const avatar = req.file
        console.log('req.file.buffer = ', req.file.buffer)
        const filePath = avatar.originalname
        const paramsS3 = {
            Bucket: process.env.BUCKET_NAME,
            Key: filePath,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }

        s3.upload(paramsS3, async (err, data) => {
            if (err) {
                console.log('Upload fail', err)
                return res.json({
                    status: 500,
                    message: 'Server cannot save your avatar, try again!',
                })
            } else {
                const user = await User.findOneAndUpdate(
                    { userName: username },
                    { avatar: data.Location }
                )
                return res.json({
                    status: 200,
                    message: 'Changed avatar successfully!',
                    avatar: data.Location,
                })
            }
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const uploadAvatarMobile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username

        const base64String = req.body[0].base64 // Truy cập vào trường base64 trong mảng

        const bufferData = Buffer.from(base64String, 'base64') // Chuyển đổi từ chuỗi base64 sang đối tượng Buffer
        const filePath = generateUniqueFileName()
        const paramsS3 = {
            Bucket: process.env.BUCKET_NAME,
            Key: filePath,
            Body: bufferData,
            ContentType: req.body[0].type,
        }

        s3.upload(paramsS3, async (err, data) => {
            if (err) {
                console.log('Upload fail', err)
                return res.json({
                    status: 500,
                    message: 'Server cannot save your avatar, try again!',
                })
            } else {
                const user = await User.findOneAndUpdate(
                    { userName: username },
                    { avatar: data.Location }
                )
                return res.json({
                    status: 200,
                    message: 'Changed avatar successfully!',
                    avatar: data.Location,
                })
            }
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

function generateUniqueFileName() {
    const timestamp = new Date().getTime(); // Get the current timestamp
    const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
    const fileName = `${timestamp}-${randomString}.jpg`; // Create the file name using the timestamp and random string
  
    return fileName;
}

const uploadBackground = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username

        const background = req.file
        const filePath = background.originalname
        const paramsS3 = {
            Bucket: process.env.BUCKET_NAME,
            Key: filePath,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }
        s3.upload(paramsS3, async (err, data) => {
            if (err) {
                console.log('Upload fail', err)
                return res.json({
                    status: 500,
                    message: 'Server cannot save your background, try again!',
                })
            } else {
                const user = await User.findOneAndUpdate(
                    { userName: username },
                    { background: data.Location }
                )
                return res.json({
                    status: 200,
                    message: 'Changed background successfully!',
                    background: data.Location,
                })
            }
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const updateAboutUs = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username

        const { description, hobbies } = req.body
        await User.findOneAndUpdate(
            { userName: username },
            { description: description, hobbies: hobbies }
        )
        return res.json({
            status: 200,
            message: 'Changed your infomation successfully!',
            description: description,
            hobbies: hobbies,
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const searchUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const myusername = decoded.username
        const { search } = req.query
        const searchRegex = new RegExp(search, 'i')
        const finds = await User.find(
            {
                $or: [
                    { userName: searchRegex },
                    { firstName: searchRegex },
                    { lastName: searchRegex },
                    { email: searchRegex },
                ],
                userName: { $ne: myusername },
            },
            {
                firstName: 1,
                friends: 1,
                lastName: 1,
                userName: 1,
                avatar: 1,
                background: 1,
                _id: 1,
            }
        )

        finds.forEach((userFind) => {
            if (userFind.friends.includes(myusername)) userFind.isFriend = 1
            else userFind.isFriend = 0
        })

        finds.sort((a, b) => b.isFriend - a.isFriend)

        if (finds) {
            return res.json({
                status: 200,
                users: finds,
            })
        } else {
            return res.json({
                status: 201,
                message: 'User not found!',
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const searchFriend = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username
        const { search } = req.query
        const searchRegex = new RegExp(search, 'i')

        const finds = await User.find(
            {
                $or: [
                    { userName: searchRegex },
                    { firstName: searchRegex },
                    { lastName: searchRegex },
                    { email: searchRegex },
                ],
                friends: { $in: username },
            },
            {
                firstName: 1,
                friends: 1,
                lastName: 1,
                userName: 1,
                avatar: 1,
                background: 1,
            }
        )

        if (finds) {
            return res.json({
                status: 200,
                users: finds,
            })
        } else {
            return res.json({
                status: 201,
                message: 'User not found!',
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const addFriend = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username

        const { userNameAdd } = req.body

        const user = await User.findOne({ userName: username })
        if (!user) {
            return res.json({
                status: 400,
                message: 'User not found',
            })
        }

        const dataUpdate = await User.findOneAndUpdate(
            { userName: username },
            { $addToSet: { friends: userNameAdd } },
            { new: false }
        )
        const dataUpdateFriend = await User.findOneAndUpdate(
            { userName: userNameAdd },
            { $addToSet: { friends: username } },
            { new: false }
        )
        if (!dataUpdate && !dataUpdateFriend) {
            return res.json({
                status: 500,
                message: "Can't add friends, please try again",
            })
        }

        createChat11(username, userNameAdd)

        const userAddedNotify = {
            userName: userNameAdd,
            content: `You and ${user.firstName} ${user.lastName} have become friends!`,
            view: 0,
            image: user.avatar
        }
        
        const notifyAdded = await Notify.create(userAddedNotify)

        const userAddNotify = {
            userName: username,
            content: `You and ${dataUpdateFriend.firstName} ${dataUpdateFriend.lastName} have become friends!`,
            view: 0,
            image: dataUpdateFriend.avatar
        }

        const notifyAdd = await Notify.create(userAddNotify)

        return res.json({
            status: 200,
            message: 'Add successful friends',
        })
    } catch (error) {
        console.error(error)
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const createChat11 = async (username, userNameAdd) => {
    //Tạo chat
    const findChat = await Member.find({
        chatType: 'single',
        userName: username,
        createdBy: userNameAdd,
    })
    if (!(findChat && findChat.length)) {
        const newChat = {
            chatType: 'single',
            createdBy: username,
        }

        const chat = await Chat.create(newChat)

        if (!chat) {
            return res.json({
                status: 500,
                message: "Can't create chat, please try again",
            })
        }

        const newMember = [
            {
                chatId: chat._id,
                userName: username,
                notifyType: 1,
                chatType: 'single',
                createdBy: userNameAdd,
            },
            {
                chatId: chat._id,
                userName: userNameAdd,
                notifyType: 1,
                chatType: 'single',
                createdBy: username,
            },
        ]

        const member = await Member.create(newMember)

        if (!member) {
            return res.json({
                status: 500,
                message: "Can't create chat, please try again",
            })
        }

        const nameUser = await User.findOne({ userName: username })
        const nameUserAdd = await User.findOne({ userName: userNameAdd })

        const fullNameUser = nameUser.firstName + ' ' + nameUser.lastName
        const fullNameUserAdd =
            nameUserAdd.firstName + ' ' + nameUserAdd.lastName

        const newMessage = [
            {
                chatId: chat._id,
                userName: username,
                typeMessage: 0,
                content: `You and ${fullNameUserAdd} have just become friends`,
                createdBy: userNameAdd,
            },
            {
                chatId: chat._id,
                userName: userNameAdd,
                typeMessage: 0,
                content: `You and ${fullNameUser} have just become friends`,
                createdBy: username,
            },
        ]

        const message = await Message.create(newMessage)

        if (!message) {
            return res.json({
                status: 500,
                message: "Can't create chat, please try again",
            })
        }
    }
}

const getUser = async (req, res) => {
    const { username } = req.query
    const user = await User.findOne({ userName: username })
    return res.json({
        status: 200,
        user: user,
    })
}

const deleteFriend = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username

        const { userNameDelete } = req.body

        const user = await User.findOne({ userName: username })
        if (!user) {
            return res.json({
                status: 400,
                message: 'User not found',
            })
        }

        const dataUpdate = await User.findOneAndUpdate(
            { userName: username },
            { $pull: { friends: userNameDelete } },
            { new: false }
        )
        const dataUpdateFriend = await User.findOneAndUpdate(
            { userName: userNameDelete },
            { $pull: { friends: username } },
            { new: false }
        )
        if (!dataUpdate && !dataUpdateFriend) {
            return res.json({
                status: 500,
                message: "Can't delete friends, please try again",
            })
        }
        return res.json({
            status: 200,
            message: 'Delete successful friends',
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const getMyUser = async (req, res) => {
    try {
        const user = await User.findOne({ userName: username })

        if (user) {
            return res.json({
                status: 200,
                users: user,
            })
        } else {
            return res.json({
                status: 201,
                message: 'User not found!',
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const changeTheme = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username
        const { nightMode } = req.params

        const user = await User.findOneAndUpdate(
            { userName: username },
            { nightMode: Number(nightMode) }
        )
        if (user) {
            return res.json({
                status: 200,
                message: 'Change theme successfully!',
                nightMode: nightMode,
            })
        } else {
            return res.json({
                status: 201,
                message: 'User not found!',
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const checkAuth = async (req, res) => {
    try {
        return res.json({
            status: 200,
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 402,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const changePassword = async (req, res) => {
    try {
        const { currentpass, newpass, repass } = req.body
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username
        // Check email
        const user = await User.findOne({ userName: username })
        if (!user) {
            return res.json({
                status: 400,
                message: 'User not found',
            })
        }

        const isMatch = await bcrypyjs.compare(currentpass, user.password)
        if (!isMatch) {
            return res.json({
                status: 400,
                message: 'Invalid credentials',
            })
        }

        const hashedPassword = await bcrypyjs.hash(newpass, 10)
        if (newpass == repass) {
            const user = await User.findOneAndUpdate(
                { userName: username },
                { password: hashedPassword }
            )
        } else {
            return res.json({
                status: 500,
                message: 'Invalid Repeat password',
            })
        }

        return res.json({
            status: 200,
            message: 'Change passwords successfully',
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 402,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const getFriendAddGroup = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username

        const { search, chatId } = req.query
        const searchRegex = new RegExp(search, 'i')

        const user = await User.findOne({ userName: username }) // Tìm người dùng dựa trên username của bạn

        if (!user) {
            return res.json({
                status: 500,
                message: 'User does not exist!',
            })
        }

        const friendUsernames = user.friends
        const friends = await User.find(
            {
                userName: { $in: friendUsernames },
                $or: [
                    { userName: searchRegex },
                    { firstName: searchRegex },
                    { lastName: searchRegex },
                    { email: searchRegex },
                ],
            },
            {
                userName: 1,
                friends: 1,
                firstName: 1,
                lastName: 1,
                avatar: 1,
                background: 1,
            }
        )

        const userGroupChat = await Member.find({ chatId: chatId })

        friends.forEach((userFriend) => {
            const inGroup = userGroupChat.find(
                (userGroup) => userGroup.userName === userFriend.userName
            )
            if (inGroup) {
                userFriend.inThisGroup = 1
            } else {
                userFriend.inThisGroup = 0
            }
        })

        return res.json({
            status: 200,
            data: friends,
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}


const getInfoOtherUser = async(req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username

        const {userId} = req.body;
        const user = await User.findOne({ _id: new mongoose.Types.ObjectId(userId) })

        if(!user){
            return res.json({
                status: 500,
                message: 'User does not exist!',
            })
        } 

        let isMyFriend = user.friends.filter((userFriend) => userFriend === username).length > 0 ? 1 : 0;
        let chatId = null;
        if(isMyFriend){
            chatId = await Chat.aggregate([
                {
                    $lookup: {
                        from: 'members',
                        localField: '_id',
                        foreignField: 'chatId',
                        as: 'members'
                    }
                },
                {
                    $match: {
                        'members.userName': { $all: [username, user.userName] },
                        'members.chatType': 'single'
                    }
                }
            ]);
        }

        return res.json({
            status: 200,
            info: user,
            isMyFriend: isMyFriend, 
            chatId: chatId ? chatId[0]._id : null,
        })


    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}


const changePrivateProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_CODE)
        const username = decoded.username

        const { private } = req.body;

        const user = await User.findOneAndUpdate(
            { userName: username },
            { private: Number(private) },
        )

        if (!user) {
            return res.json({
                status: 500,
                message: 'User does not exist!',
            })
        } 

        return res.json({
            private: private,
            status: 200,
            message: private == 1 ? 'Private profile updated' : 'Public profile updated'
        })




    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}


module.exports = {
    signUp,
    mailConfirm,
    authEmail,
    signIn,
    editProfile,
    getFriends,
    uploadAvatar,
    updateAboutUs,
    uploadBackground,
    searchUser,
    changeTheme,
    addFriend,
    getMyUser,
    deleteFriend,
    checkAuth,
    changePassword,
    getFriendAddGroup,
    getUser,
    searchFriend,
    uploadAvatarMobile,
    getInfoOtherUser,
    changePrivateProfile
}
