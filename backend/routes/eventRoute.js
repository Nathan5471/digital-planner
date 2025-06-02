import express from 'express';
import { addEvent, updateEvent, deleteEvent, getEventsByDate, getEventsByType, loadEvent} from '../controllers/eventController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
    const { title, description, type, date } = req.body;
    try {
        if (!title || !description || !type || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        addEvent(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/', authenticate, async (req, res) => {
    const { id, title, description, type, date } = req.body;
    try {
        if (!id || !title || !description || !type || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        updateEvent(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/', authenticate, async (req, res) => {
    const { id } = req.query;
    try {
        if (!id) {
            return res.status(400).json({ message: 'Event ID is required' });
        }
        deleteEvent(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/eventsByDate', authenticate, async (req, res) => {
    const { date } = req.query;
    try {
        if (!date) {
            return res.status(400).json({ message: 'Date is required' });
        }
        getEventsByDate(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/eventsByType', authenticate, async (req, res) => {
    const { type, date } = req.query;
    try {
        if (!type || !date) {
            return res.status(400).json({ message: 'Type and date are required' });
        }
        getEventsByType(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/loadEvent', authenticate, async (req, res) => {
    const { id } = req.query;
    try {
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }
        loadEvent(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;