const User = require("../models/user.js");
const signUpValid =  require("../validations/UserValidation.js")
const bcrypyjs = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Mailgen = require('mailgen');
dotenv.config()
const nodemailer = require("nodemailer");

const { SECRET_CODE } = process.env;
const mailConfirm = async (req, res) =>{
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'onlydevquyen@gmail.com',
                pass: 'jgviuiguozzcdlak',
            },
        });

        let email = req.body.email;
        let token = jwt.sign({ email: email }, SECRET_CODE);

        var mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'CATTALK',
                link: `${req.get('host')}`,
                logo: 'https://mailgen.js/img/logo.png'
            }
        })

        var response = {
            body: {
                name: 'Newbie',
                intro: 'Welcome to CATTALK! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To get started with CATTALK, please click here:',
                    button: {
                        color: '#44bccc',
                        text: 'Confirm your account',
                        link: `${req.get('host')}/signup?token=${token}`
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };

        let mail = mailGenerator.generate(response)

        const mailOptions = {
            from: 'onlydevquyen@gmail.com',
            subject: 'Confirm your email address',
            to: email,
            html: mail
        };
            
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                res.status(500).json({ message: 'Error sending verification email.' });
            } else {
                res.status(200).json({ message: 'Verification email sent.' });
            }
        });
    }catch(error){
        return res.json({
            status: 500,
            message: error,
        })
    }
}



const signUp = async (req, res) => {
    try {
        // Validation
        const { userName, firstName, lastName, email, password  } = req.body
        const { error } = signUpValid.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.json({
                status: 400,
                message: errors,
            });
        }

        // Check email
        const emailExists = await User.findOne({ email })
        if (emailExists) {
            return res.json({
                status: 400,
                message: "Email already use"
            });
        }

        //check username
        const userNameExists = await User.findOne({ userName })
        if (userNameExists){
            return res.json({
                status: 400,
                message: "Username already use"
            });
        }


        // Hash password
        const hashedPassword = await bcrypyjs.hash(password, 10);
        const user = await User.create({
            userName,
            firstName,
            lastName,
            email,
            password: hashedPassword,
        })
        //  Get info for client
        user.password = undefined;
        return res.json({
            status: 200,
            message: "User created successfully",
            user
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: error,
            error
        })
    }
};

// const token = crypto.randomBytes(32).toString('hex');

module.exports = signUp ;
module.exports = mailConfirm;