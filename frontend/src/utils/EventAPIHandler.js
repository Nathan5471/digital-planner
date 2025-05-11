import axios from 'axios';

const baseURL = 'https://localhost:5000/api/events';

const addEvent = async (accessToken, eventData) => {
    try {
        const response = await axios.post(`${baseURL}`, eventData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding event:', error);
        throw error;
    }
}

const updateEvent = async (accessToken, eventData) => {
    try {
        const response = await axios.put(`${baseURL}`, eventData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
}

const deleteEvent = async (accessToken, eventId) => {
    try {
        const response = await axios.delete(`${baseURL}`, eventId, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
}

const getEventIdsByDate = async (accessToken, date) => {
    try {
        const response = await axios.get(`${baseURL}/idsByDate`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: { date },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching event IDs by date:', error);
        throw error;
    }
}

const getEventIdsByType = async (accessToken, type, date) => {
    try {
        const response = await axios.get(`${baseURL}/idsByType`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: { type, date },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching event IDs by type:', error);
        throw error;
    }
}

const loadEvent = async (accessToken, eventId) => {
    try {
        const response = await axios.get(`${baseURL}/loadEvent`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
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