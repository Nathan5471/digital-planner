import { updateLocalStorage, getLocalStorage } from './LocalStorage.jsx';

function loadEvents() {
    const loadedEvents = getLocalStorage('events');
    if (loadedEvents) {
        return loadedEvents
    } else {
        return []
    }
}


function addEvent(eventTitle, eventDescription, eventType, eventDate) {
    const eventId = loadEvents().length + 1; // Simple ID generation
    const event = {
        id: eventId,
        title: eventTitle,
        description: eventDescription,
        type: eventType,
        date: eventDate,
    };
    const newEvents = loadEvents().concat(event);
    updateLocalStorage('events', newEvents);
}

function deleteEvent(eventId) {
    const newEvents = loadEvents().filter(event => event.id !== eventId);
    updateLocalStorage('events', newEvents);
}

function updateEvent(eventId, newEventTitle, newEventDescription, newEventType, newEventDate) {
    const newEvents = loadEvents().map(event => {
        if (event.id === eventId) {
            return {
                id: eventId,
                title: newEventTitle,
                description: newEventDescription,
                type: newEventType,
                date: newEventDate,
            };
        }
        return event;
    });
    updateLocalStorage('events', newEvents);
}

function getEventIdsByDate(date) {
    const eventIds = loadEvents().filter(event => event.date === date).map(event => event.id);
    return eventIds;
}

function loadEvent(eventId) {
    const event = loadEvents().find(event => event.id === eventId);
    if (event) {
        return event;
    } else {
        return null;
    }
}

export { addEvent, deleteEvent, updateEvent, getEventIdsByDate, loadEvent };