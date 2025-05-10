import express from 'express';
import { registerUser, loginUser, deleteUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        registerUser(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        loginUser(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/', async (req, res) => {
    try {
        deleteUser(req, res);
    }  catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;