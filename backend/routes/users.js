import express from 'express'
import User from '../model/User.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();


router.get('/', authMiddleware(['admin']), async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/:id', authMiddleware(['admin', 'user']), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.put('/:id', authMiddleware(['admin', 'user']), async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', authMiddleware(['admin']), async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

export default router;