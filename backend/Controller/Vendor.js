
import express from 'express'
import Vendor from '../model/Vendor.js';
import authMiddleware from '../middleware/authMiddleware.js';
import Jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import Menu from '../model/Menu.js';



const generateToken = Vendor => {
    return Jwt.sign({ id: Vendor._id, role: Vendor.role }, "sdfdsadf", {
        expiresIn: '24h',
    })
}

export const register = async (req, res) => {

    const { fname, name, email, password, acity, oaddress, ophoto } = req.body;


    try {

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        const vendor = new Vendor({
            fname, name, email, password: hashedPassword, acity, oaddress, ophoto
        })

        await vendor.save()

        res.status(200).json({ success: true, message: 'Vendor successfully created' })


    } catch (error) {
        res.status(500).json({ success: false, message: 'Invalid Credential' })
    }
}
export const login = async (req, res) => {
    const { email } = req.body;

    try {
        const vendor = await Vendor.findOne({ email })

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" })
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, vendor.password)
        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: "Invalid Credential" })
        }
        const token = generateToken(vendor);

        const { password, role, ...rest } = vendor._doc;
        res.status(200).json({ status: true, message: "successfully login", token, data: { ...rest }, role })


    } catch (error) {
        res.status(500).json({ status: false, message: "Failed to login" })
    }
}


export const menus = async (req, res) => {
    try {
        const menu = new Menu(req.body);
        await menu.save();
        res.status(201).send(menu);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const menusall = async (req, res) => {
    try {
        const menus = await Menu.find({});
        res.status(200).send(menus);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const vendorsmenu = async (req, res) => {
    try {
        const menus = await Menu.find({ vendorId: req.params.vendorId });
        res.status(200).send(menus);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const vendorsmenudetail = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).send();
        }
        res.status(200).send(menu);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const menuupdate = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'price', 'category', 'photo'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).send();
        }

        updates.forEach(update => menu[update] = req.body[update]);
        await menu.save();
        res.status(200).send(menu);
    } catch (error) {
        res.status(400).send(error);
    }
}

// Delete a menu by ID
export const menudelete = async (req, res) => {
    try {
        const menu = await Menu.findByIdAndDelete(req.params.id);
        if (!menu) {
            return res.status(404).send();
        }
        res.status(200).send(menu);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getVendorsByCity = async (req, res) => {
    const { acity } = req.params;

    try {
        const vendors = await Vendor.find({ acity });
        if (!vendors) {
            return res.status(404).json({ message: 'No vendors found in this city' });
        }
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllCitiesWithVendors = async (req, res) => {
    try {
        const cities = await Vendor.distinct('acity');
        if (!cities || cities.length === 0) {
            return res.status(404).json({ message: 'No cities found with vendors' });
        }
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json(vendor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}