import express from 'express';
import { registerUser, loginUser, editUsername, editEmail, editPassword, logoutUser, deleteUser, getCurrentUser, getDarkModePreference, setDarkModePreference } from '../controllers/authController.js';
import authenticate from '../middleware/authenticate.js';

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

router.get('/', authenticate, async (req, res) => {
    try {
        getCurrentUser(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/username', authenticate, async (req, res) => {
    const { newUsername } = req.body;
    try {
        if (!newUsername) {
            return res.status(400).json({ message: 'New username is required' });
        }
        editUsername(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/email', authenticate, async (req, res) => {
    const { newEmail } = req.body;
    try {
        if (!newEmail) {
            return res.status(400).json({ message: 'New email is required' });
        }
        editEmail(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/password', authenticate, async (req, res) => {
    const { newPassword } = req.body;
    try {
        if (!newPassword) {
            return res.status(400).json({ message: 'New password is required' });
        }
        editPassword(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/logout', authenticate, async (req, res) => {
    try {
        logoutUser(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

router.delete('/', authenticate, async (req, res) => {
    try {
        deleteUser(req, res);
    }  catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/darkmode', authenticate, async (req, res) => {
    try {
        getDarkModePreference(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/darkmode', authenticate, async (req, res) => {
    const { darkMode } = req.body;
    try {
        if (darkMode === undefined) {
            return res.status(400).json({ message: 'Dark mode preference is required' });
        }
        setDarkModePreference(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;