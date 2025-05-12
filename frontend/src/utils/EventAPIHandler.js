import axios from 'axios';

const baseURL = 'https://localhost:5000/api/events';

const addEvent = async (eventData) => {
    try {
        const response = await axios.post(`${baseURL}`, eventData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error adding event:', error);
        throw error;
    }
}

const updateEvent = async (eventData) => {
    try {
        const response = await axios.put(`${baseURL}`, eventData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
}

const deleteEvent = async (eventId) => {
    try {
        const response = await axios.delete(`${baseURL}`, eventId, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
}

const getEventIdsByDate = async (date) => {
    try {
        const response = await axios.get(`${baseURL}/idsByDate`, {
            withCredentials: true,
            params: { date }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching event IDs by date:', error);
        throw error;
    }
}

const getEventIdsByType = async (type, date) => {
    try {
        const response = await axios.get(`${baseURL}/idsByType`, {
            withCredentials: true,
            params: { type, date },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching event IDs by type:', error);
        throw error;
    }
}

const loadEvent = async (eventId) => {
    try {
        const response = await axios.get(`${baseURL}/loadEvent`, {
            withCredentials: true,
            params: { id: eventId },
        });
        return response.data;
    } catch (error) {
        console.error('Error loading event:', error);
        throw error;
    }
}

export {
    addEvent,
    updateEvent,
    deleteEvent,
    getEventIdsByDate,
    getEventIdsByType,
    loadEvent,
}