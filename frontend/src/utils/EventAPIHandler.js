import axios from 'axios';

const baseURL = 'https://digital-planner-backend.onrender.comapi/events';
const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

const addEvent = async (eventData) => {
    try {
        const response = await api.post('/', eventData);
        if (response.status === 201) {
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        } else {
            alert('An error occurred while adding the event');}
    }
}

const updateEvent = async (eventData) => {
    try {
        const response = await api.put('/', eventData);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        } else if (error.response && error.response.status === 403) {
            alert('You are not authorized to update this event');
        } else if (error.response && error.response.status === 404) {
            alert('Event not found');
        } else {
            alert('An error occurred while updating the event');
        }
    }
}

const deleteEvent = async (eventId) => {
    try {
        const response = await api.delete('/', {params: { id: eventId }});
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        } else if (error.response && error.response.status === 403) {
            alert('You are not authorized to delete this event');
        } else if (error.response && error.response.status === 404) {
            alert('Event not found');
        } else {
            alert('An error occurred while deleting the event');
        }
    }
}

const getEventsByDate = async (date) => {
    try {
        const response = await api.get('/eventsByDate', {params: { date }});
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        } else if (error.response && error.response.status === 404) {
            return [];
        } else {
            alert('An error occurred while fetching event IDs by date');
        }
    }
}

const getEventsByType = async (type, date) => {
    try {
        const response = await api.get('/eventsByType', {params: { type, date }});
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        } else if (error.response && error.response.status === 404) {
            return [];
        } else {
            alert('An error occurred while fetching event IDs by type');
        }
    }
}

const loadEvent = async (eventId) => {
    try {
        const response = await api.get(`${baseURL}/loadEvent`, {params: { id: eventId }});
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        } else if (error.response && error.response.status === 403) {
            alert('You are not authorized to load this event');
        } else if (error.response && error.response.status === 404) {
            alert('Event not found');
        } else {
            alert('An error occurred while loading the event');
        }
    }
}

export {
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsByDate,
    getEventsByType,
    loadEvent,
}