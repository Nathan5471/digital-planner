import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import generateToken from '../utils/generateToken.js';
import { deleteUserEvents } from './eventController.js';
import { de } from 'date-fns/locale';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = generateToken(newUser._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        })
        res.status(201).json({
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = generateToken(user._id);
        res.cookie('token', token, {
            withCredentials: true,
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        })
        res.status(200).json({
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const editUsername = async (req, res) => {
    const { newUsername } = req.body;
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const existingUsername = await User.find({ username: newUsername });
        if (existingUsername.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        user.username = newUsername;
        await user.save();
        res.status(200).json({ message: 'Username updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const editEmail = async (req, res) => {
    const { newEmail } = req.body;
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const existingEmail = await User.find({ email: newEmail });
        if (existingEmail.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        user.email = newEmail;
        await user.save();
        res.status(200).json({ message: 'Email updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const editPassword = async (req, res) => {
    const { newPassword } = req.body;
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}

export const deleteUser = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        deleteUserEvents(userId);
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getDarkModePreference = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('darkMode');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ darkMode: user.darkMode });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const setDarkModePreference = async (req, res) => {
    try {
        const { darkMode } = req.body;
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.darkMode = darkMode;
        await user.save();
        res.status(200).json({ message: 'Dark mode preference updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}