const User = require("../models/user.js");
const { signUpValid, signInValid, updatValid } = require("../validations/UserValidation.js")
const bcrypyjs = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Mailgen = require('mailgen');
const Token = require("../models/token.js");
dotenv.config()
const nodemailer = require("nodemailer");
const s3 = require("../config/aws-helper.js");


const { SECRET_CODE, AUTH_MAIL, AUTH_PASS, EXPIRATION_TIME } = process.env;
const mailConfirm = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: AUTH_MAIL,
                pass: AUTH_PASS,
            },
        });

        let email = req.body.email;
        let checkUser = await User.find({ email: email })
        if (checkUser.length > 0) {
            return res.json({
                status: 500,
                message: 'Email already in use!'
            })
        } else {
            let otp = Math.floor(1000 + Math.random() * 9000);
            const token = await Token.findOneAndReplace({ email: email, otp: otp })
            var mailGenerator = new Mailgen({
                theme: 'default',
                product: {
                    name: 'CATTALK',
                    link: `${req.get('host')}`,
                    logo: 'https://cattalk.id.vn/src/assets/logo_vertical.png?t=1705984018125',
                    logoHeight: '50px'
                }
            })

            var emailConfig = {
                body: {
                    name: 'Newbie',
                    intro: 'Welcome to CATTALK! We\'re very excited to have you on board.',
                    action: {
                        instructions: 'To get started with CATTALK, please input this OTP at step three:',
                        button: {
                            color: '#22BC66', // Optional action button color
                            text: `${otp}`,
                            link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
                        }
                    },
                    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
                }
            };

            // Generate an HTML email with the provided contents
            var mail = mailGenerator.generate(emailConfig);

            const mailOptions = {
                from: 'cattalkvn@gmail.com',
                subject: 'Confirm your email address',
                to: email,
                html: mail
            };

            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    res.json({ status: 500, message: 'Error sending verification email.' });
                } else {
                    res.json({ status: 200, message: 'Verification email sent.' });
                }
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error,
        })
    }
}

const authEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const emailExists = await User.findOne({ email: email, otp: 1 })
        if (emailExists) {
            return res.json({
                status: 500,
                message: "Email already used"
            });
        }

        const register = await Token.findOne({ email: email })
        if (!register) {
            return res.json({
                status: 500,
                message: "Submit your mail to continute"
            });
        }

        if (otp == register.otp) {
            //  Creat jwt token
            const token = jwt.sign(
                { email: email },
                SECRET_CODE,
                { expiresIn: "1d" }
            )
            return res.json({
                status: 200,
                token: token
            })
        } else {
            return res.json({
                status: 500,
                message: 'OTP code is invalid'
            })
        }

    } catch (e) {
        console.log(e);
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
        const decoded = jwt.verify(token, SECRET_CODE);
        const email = decoded.email;
        const { error } = signUpValid.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.json({
                status: 400,
                message: errors,
            });
        }
        // Check email
        const emailExists = await User.findOne({ email: email, otp: 1 })
        if (emailExists) {
            return res.json({
                status: 500,
                message: "Email already used"
            });
        }

        //check username
        const userNameExists = await User.findOne({ userName })
        if (userNameExists) {
            return res.json({
                status: 500,
                message: "Username already used"
            });
        }


        // Hash password
        const hashedPassword = await bcrypyjs.hash(password, 10);
        console.log(email);
        const user = await User.create({
            userName,
            firstName,
            lastName,
            email,
            password: hashedPassword,
        })
        console.log(user);
        //  Get info for client
        user.password = undefined;
        return res.json({
            status: 200,
            message: "User created successfully",
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
};


const signIn = async (req, res) => {
    try {
        // Validation
        const { userName, password } = req.body
        const { error } = signInValid.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.json({
                status: 401,
                message: errors,
            });
        }
        // Check email
        const user = await User.findOne({ userName })
        if (!user) {
            return res.json({
                status: 400,
                message: "User not found"
            })
        }

        const isMatch = await bcrypyjs.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                status: 400,
                message: "Invalid credentials"
            })
        }
        //  Creat jwt token
        const token = jwt.sign(
            { username: user.userName },
            SECRET_CODE,
            { expiresIn: "1d" }
        )

        //  Return result:
        user.password = undefined

        return res.json({
            status: 200,
            message: "User logged in successfully",
            user: user,
            accessToken: token
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
};

const editProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, SECRET_CODE);
        const username = decoded.username;
        const { error } = updatValid.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.json({
                status: 401,
                message: errors,
            });
        }
        const user = await User.findOne({ userName: username });
        if (!user) {
            return res.json({
                status: 400,
                message: "User not found"
            })
        }

        let profile = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            birthday: req.body.birthday,
            hometown: req.body.hometown
        }

        const isMatch = await bcrypyjs.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.json({
                status: 500,
                message: "Invalid credentials"
            })
        }

        const dataUpdate = await User.findOneAndUpdate({ userName: username }, profile, { new: false });
        if (!dataUpdate) {
            return res.json({
                status: 500,
                message: "Your information is invalid, please try again",
            });
        }
        return res.json({
            status: 200,
            message: "Your information has been successfully updated",
            user: dataUpdate,
        })

    } catch (e) {
        console.log(e);
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const getFriends = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, SECRET_CODE);
        const username = decoded.username;

        const user = await User.findOne({ userName: username }); // Tìm người dùng dựa trên username của bạn

        if (!user) {
            return res.json({
                status: 500,
                message: 'User does not exist!',
            })
        }

        const friendUsernames = user.friends;
        const friends = await User.find({ userName: { $in: friendUsernames } }, { userName: 1, friends: 1, firstName: 1, lastName: 1, avatar: 1 });

        return res.json({
            status: 200,
            data: friends
        })

    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const uploadAvatar = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, SECRET_CODE);
        const username = decoded.username;

        const avatar = req.file;
        const filePath = avatar.originalname;
        const paramsS3 = {
            Bucket: process.env.BUCKET_NAME,
            Key: filePath,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }

        s3.upload(paramsS3, async (err, data) => {
            if (err) {
                console.log("Upload fail", err);
                return res.json({
                    status: 500,
                    message: 'Server cannot save your avatar, try again!',
                })
            } else {
                const user = await User.findOneAndUpdate({ 'userName': username }, { avatar: data.Location })
                return res.json({
                    status: 200,
                    message: 'Changed avatar successfully!',
                    avatar: data.Location
                })
            }
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const uploadBackground = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, SECRET_CODE);
        const username = decoded.username;

        const avatar = req.file;
        const filePath = avatar.originalname;
        const paramsS3 = {
            Bucket: process.env.BUCKET_NAME,
            Key: filePath,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }
        s3.upload(paramsS3, async (err, data) => {
            if (err) {
                console.log("Upload fail", err);
                return res.json({
                    status: 500,
                    message: 'Server cannot save your background, try again!',
                })
            } else {
                const user = await User.findOneAndUpdate({ 'userName': username }, { background: data.Location })
                return res.json({
                    status: 200,
                    message: 'Changed background successfully!',
                    avatar: data.Location
                })
            }
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

const updateAboutUs = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, SECRET_CODE);
        const username = decoded.username;

        const { description, hobbies } = req.body;
        await User.findOneAndUpdate({ 'userName': username }, { description: description, hobbies: hobbies })
        return res.json({
            status: 200,
            message: 'Changed your infomation successfully!',
            description: description,
            hobbies: hobbies
        })

    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: 'Opps, somthing went wrong!!!',
        })
    }
}

module.exports = { signUp, mailConfirm, authEmail, signIn, editProfile, getFriends, uploadAvatar, updateAboutUs, uploadBackground};