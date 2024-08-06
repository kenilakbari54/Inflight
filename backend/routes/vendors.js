import express from 'express'
import { getAll, getAllCitiesWithVendors, getVendor, getVendorsByCity, login, menudelete, menus, menusall, menuupdate, register, vendorsmenu, vendorsmenudetail } from '../Controller/Vendor.js';
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import User from '../model/User.js';
// import Vendor from '../model/Vendor.js';


const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/menus', menus)
router.get('/menus/all', menusall)
router.get('/menus/vendor/:vendorId', vendorsmenu)
router.get('/menus/:id', vendorsmenudetail)

router.put('/menus/:id', menuupdate)
router.delete('/menus/:id', menudelete)
router.get('/city/:acity', getVendorsByCity);

router.get('/city', getAllCitiesWithVendors);
router.get('/:id', getVendor);

router.get('/', getAll);

export default router




// import express from 'express'
// import Vendor from '../model/Vendor.js';
// import authMiddleware from '../middleware/authMiddleware.js';
// import Jwt from "jsonwebtoken"
// import bcrypt from 'bcryptjs'

// const router = express.Router();





// const generateToken = user => {
//     return Jwt.sign({ id: Vendor._id, role: Vendor.role }, "sdfdsadf", {
//         expiresIn: '24h',
//     })
// }


// router.post('/register', async (req, res) => {

//     const { fname, oname, email, password, acity, OAddress, Ophoto, GST } = req.body;


//     try {

//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password, salt)


//         const vendor = new Vendor({
//             fname, oname, email, password: hashedPassword, acity, OAddress, Ophoto, GST
//         })

//         await vendor.save()

//         res.status(200).json({ success: true, message: 'Vendor successfully created' })


//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Invalid Credential' })
//     }
// })
// router.post('/login', async (req, res) => {
//     const { email } = req.body;

//     try {
//         const vendor = await Vendor.findOne({ email })

//         if (!vendor) {
//             return res.status(404).json({ message: "Vendor not found" })
//         }
//         const isPasswordMatch = await bcrypt.compare(req.body.password, vendor.password)
//         if (!isPasswordMatch) {
//             return res.status(400).json({ status: false, message: "Invalid Credential" })
//         }
//         const token = generateToken(vendor);

//         const { password, role, ...rest } = vendor._doc;
//         res.status(200).json({ status: true, message: "successfully login", token, data: { ...rest }, role })


//     } catch (error) {
//         res.status(500).json({ status: false, message: "Failed to login" })
//     }
// }
// )


// router.get('/', authMiddleware(['admin', 'user']), async (req, res) => {
//     try {
//         const vendors = await Vendor.find().sort({ airportName: 1 });
//         res.json(vendors);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

// router.get('/:id', authMiddleware(['admin', 'vendor']), async (req, res) => {
//     try {
//         const vendor = await Vendor.findById(req.params.id);
//         if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
//         res.json(vendor);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

// router.put('/:id', authMiddleware(['admin', 'vendor']), async (req, res) => {
//     try {
//         const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(vendor);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

// router.delete('/:id', authMiddleware(['admin']), async (req, res) => {
//     try {
//         await Vendor.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Vendor deleted' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

// export default router;