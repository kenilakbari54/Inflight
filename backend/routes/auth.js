import express from 'express'
import { getUser, login, register } from '../Controller/Auth.js';
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import User from '../model/User.js';
// import Vendor from '../model/Vendor.js';


const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/user/:id', getUser)

export default router

// router.post('/signup', async (req, res) => {
//     const { name, email, password, phone, city, photo } = req.body;

//     try {
//         let user;
//         user = new User({ name, password, email, phone, city, photo });
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         await user.save();

//         const payload = {
//             user: {
//                 id: user.id,
//                 role: user.role
//             }
//         };

//         jwt.sign(payload, 'kjhvhjhkjh', { expiresIn: '24H' }, (err, token) => {
//             if (err) throw err;
//             res.status(200).json({ token });
//         });
//         // res.status(201).json({ success: true, message: 'User successfully created' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         let user = await User.findOne({ username }) || await Admin.findOne({ username }) || await Vendor.findOne({ username });
//         if (!user) {
//             return res.status(400).json({ message: 'User Not Exist' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Incorrect Password !' });
//         }

//         const payload = {
//             user: {
//                 id: user.id,
//                 role: user.role
//             }
//         };

//         jwt.sign(payload, 'your_jwt_secret', { expiresIn: 360000 }, (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//         });
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// export default router;
