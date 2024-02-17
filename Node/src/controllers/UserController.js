import User from "../models/user.js"
import { signUp } from "../validation/user.js"
import bcrypyjs from "bcryptjs"
import dotenv from "dotenv"
dotenv.config()

const { SECRET_CODE } = process.env;


export const signUp = async (req, res) => {
    try {
        // Validation
        const { firstName, lastName, email, password } = req.body
        const { error } = signUpValid.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.json({
                status: 400,
                message: errors,
            });
        }

        // Check email
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.json({
                status: 400,
                message: "User already exists"
            });
        }
        // Hash password
        const hashedPassword = await bcrypyjs.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        })
        //  Get info for client
        // user.password = undefined;
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