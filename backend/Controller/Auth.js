import User from "../model/User.js"
import Jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'


const generateToken = user => {
    return Jwt.sign({ id: user._id, role: user.role }, "sdfdsadf", {
        expiresIn: '24h',
    })
}


export const register = async (req, res) => {

    const { name, email, password, city, photo } = req.body;


    try {

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        const user = new User({
            name,
            email,
            password: hashedPassword,
            city,
            photo
        })

        await user.save()

        res.status(200).json({ success: true, message: 'User successfully created' })


    } catch (error) {
        res.status(500).json({ success: false, message: 'Invalid Credential' })

    }
}
export const login = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: "Invalid Credential" })
        }
        const token = generateToken(user);

        const { password, role, ...rest } = user._doc;
        res.status(200).json({ status: true, message: "successfully login", token, data: { ...rest }, role })


    } catch (error) {
        res.status(500).json({ status: false, message: "Failed to login" })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};