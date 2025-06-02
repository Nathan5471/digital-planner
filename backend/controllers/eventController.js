import { Event } from '../models/event.js';
import sortEventsByDate from '../utils/sortEventsByDate.js';

export const addEvent = async (req, res) => {
    const { title, description, type, date } = req.body;
    const userId = req.userId;
    try {
        const newEvent = new Event({
            userId,
            title,
            description,
            type,
            date,
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const updateEvent = async (req, res) => {
    const { id, title, description, type, date } = req.body;
    const userId = req.userId;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (event.userId !== userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        event.title = title;
        event.description = description;
        event.type = type;
        event.date = date;
        await event.save();
        res.status(200).json(event);
    }   catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteEvent = async (req, res) => {
    const { id } = req.query;
    const userId = req.userId;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (event.userId !== userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        await event.deleteOne();
        res.status(200).json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteUserEvents = async (userId) => {
    try {
        const result = await Event.deleteMany({ userId });
        if (result.deletedCount === 0) {
            console.log(`No events found for user ${userId}`);
        } else {
            console.log(`${result.deletedCount} events deleted for user ${userId}`);
        }
        
    } catch (error) {
        console.error('Error deleting user events:', error);
    }
}

export const getEventsByDate = async (req, res) => {
    const { date } = req.query;
    const userId = req.userId;
    try {
        const events = await Event.find({ userId, date });
        if (!events) {
            return res.status(404).json({ message: 'No events found' });
        }
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getEventsByType = async (req, res) => {
    // Get event IDs by type and on or after a specific date
    const { type, date, maxAmount } = req.query;
    const userId = req.userId;
    try {
        const events = await Event.find({ userId, type, date: { $gte: date } });
        if (!events) {
            return res.status(404).json({ message: 'No events found' });
        }
        const sortedEvents = sortEventsByDate(events);
        if (sortedEvents.length > maxAmount) {
            sortedEvents.length = maxAmount;
        }
        res.status(200).json({events: sortedEvents});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const loadEvent = async (req, res) => {
    const { id } = req.query;
    const userId = req.userId;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (event.userId !== userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}