const User = require('../models/user.js')
const { signUpValid, signInValid } = require('../validations/UserValidation.js')
const bcrypyjs = require('bcryptjs')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const Mailgen = require('mailgen')
dotenv.config()
const nodemailer = require('nodemailer')
const http = require('http')
const url = require('url')
const fs = require('fs')

const clients = []
const handleHTTP = (req, res) => {
    fs.readFile('index.html', (err, data) => {
        if (err) {
            res.writeHead(500)
            return res.end('Error loading index.html')
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data)
    })
}

const sendSSE = (data) => {
    clients.forEach((client) => {
        client.res.write(`data: ${JSON.stringify(data)}\n\n`)
    })
}

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
        console.log(checkUser)
        if (checkUser.length > 0) {
            return res.json({
                status: 500,
                message: 'Email already in use!',
            })
        } else {
            let token = jwt.sign({ email: email }, SECRET_CODE)

            var mailGenerator = new Mailgen({
                theme: 'default',
                product: {
                    name: 'CATTALK',
                    link: `${req.get('host')}`,
                    logo: 'https://cattalk.id.vn/src/assets/logo_vertical.png?t=1705984018125',
                },
            })

            var response = {
                body: {
                    name: 'Newbie',
                    intro: "Welcome to CATTALK! We're very excited to have you on board.",
                    action: {
                        instructions: `To get started with CATTALK, please click here:`,
                        button: {
                            color: '#44bccc',
                            text: 'Confirm your account',
                            link: `http://localhost:5173/auth-mail/${token}`,
                        },
                    },
                    outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
                },
            }

            let mail = mailGenerator.generate(response)

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
        return res.status(500).json({
            message: error,
        })
    }
}

const listenEvents = (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
    })

    clients.push({ res })

    req.on('close', () => {
        const index = clients.findIndex((client) => client.res === res)
        if (index !== -1) {
            clients.splice(index, 1)
        }
    })
}

const authEmail = (req, res) => {
    const { token } = req.query

    const confirmationData = {
        message: 'Confirmation received',
        timestamp: new Date().toISOString(),
        token: token,
    }
    sendSSE(confirmationData)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(confirmationData))
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
        const emailExists = await User.findOne({ email })

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
        //  Get info for client
        user.password = undefined
        return res.json({
            status: 200,
            message: 'User created successfully',
        })
    } catch (error) {
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
        const token = jwt.sign({ id: user.userName }, SECRET_CODE, {
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

const testData = async (req, res) => {
    try {
        const data = [
            {
                name: 'Trương Chí Nghiệm',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVzoUQXLR61QEJa7ZlHUEVt1YtBkXc7wRhA&usqp=CAU',
                notify: 2,
                contentNew: 'Em ăn gì chưa?',
            },
            {
                name: 'Nguyễn Uyển Quyên',
                avatar: 'https://thoibaotaichinhvietnam.vn/stores/news_dataimages/thoibaotaichinhvietnamvn/122015/03/11/10-nguoi-quyen-luc-nhat-lang-cong-nghe-the-gioi-03-.8340.jpg',
                notify: 2,
                contentNew: 'Ủa em',
            },
            {
                name: 'Vũ Đăng Khôi',
                avatar: 'https://thoibaotaichinhvietnam.vn/stores/news_dataimages/thoibaotaichinhvietnamvn/122015/03/11/10-nguoi-quyen-luc-nhat-lang-cong-nghe-the-gioi-12-.0831.jpg',
                notify: 2,
                contentNew: 'Chổ đó hôm qua sao rồi',
            },
            {
                name: 'Trần Văn Nam',
                avatar: 'https://thoibaotaichinhvietnam.vn/stores/news_dataimages/thoibaotaichinhvietnamvn/122015/03/11/10-nguoi-quyen-luc-nhat-lang-cong-nghe-the-gioi-12-.2508.jpg',
                notify: 2,
                contentNew: 'T chuyển cho m rồi',
            },
            {
                name: 'Nguyễn Đức Thịnh',
                avatar: 'https://thoibaotaichinhvietnam.vn/stores/news_dataimages/thoibaotaichinhvietnamvn/122015/03/11/10-nguoi-quyen-luc-nhat-lang-cong-nghe-the-gioi-03-.9139.jpg',
                notify: 2,
                contentNew: 'Chết rồi, t quên mất tiêu',
            },
            {
                name: 'Co be khoc nhe',
                avatar: 'https://cafefcdn.com/2019/7/5/photo-1-15622920117161385854940.jpg',
                notify: 2,
                contentNew: 'Oki a',
            },
            {
                name: 'Trần Văn Lục',
                avatar: 'https://vtv1.mediacdn.vn/2017/photo-2-1484589031686.jpg',
                notify: 2,
                contentNew: 'Dạ đr a',
            },
            {
                name: 'Nguyễn Lê Vi Thanh',
                avatar: 'https://nld.mediacdn.vn/2019/6/6/photo-1-15598019716201065303494.jpg',
                notify: 2,
                contentNew: 'Oki tks u',
            },
            {
                name: 'Trần Đỉnh Chi',
                avatar: 'https://static.tuoitre.vn/tto/i/s626/2016/05/25/obama-hanoi5-4read-only-1464133884.jpg',
                notify: 2,
                contentNew: 'À vậy hả, tks ô nha',
            },
            {
                name: 'Nguyễn Trấn Thành',
                avatar: 'https://cafebiz.cafebizcdn.vn/2019/5/17/photo-2-15580579930601897948260.jpg',
                notify: 2,
                contentNew: 'Chết rồi, t quên mất tiêu',
            },

            {
                name: 'Bill gate',
                avatar: 'https://topviecit.vn/blog/wp-content/uploads/2023/01/review-nganh-cong-nghe-thong-tin-topcv1.jpg',
                notify: 2,
                contentNew: 'Hôm qua cô có giao bài tập gì hong',
            },
        ]

        return res.json({
            status: 200,
            message: 'Data test message',
            data: data,
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

// const token = crypto.randomBytes(32).toString('hex');

module.exports = {
    signUp,
    mailConfirm,
    authEmail,
    listenEvents,
    signIn,
    testData,
}
