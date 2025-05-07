import { updateLocalStorage, getLocalStorage } from './LocalStorage.jsx';
import { parseISO} from 'date-fns';

function loadEvents() {
    const loadedEvents = getLocalStorage('events');
    if (loadedEvents) {
        return loadedEvents
    } else {
        return []
    }
}


function sortEventsByDate(events) {
    const sortedEvents = events.sort((a, b) => {
        const dateA = parseISO(a.date);
        const dateB = parseISO(b.date);
        return dateA - dateB;
    });
    return sortedEvents;
}


function addEvent(eventTitle, eventDescription, eventType, eventDate) {
    const eventId = new Date()
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

function getEventIdsByType(eventType, date) {
    const events = loadEvents().filter(event => event.type === eventType && parseISO(event.date) >= parseISO(date));
    const sortedEvents = sortEventsByDate(events);
    const eventIds = sortedEvents.map(event => event.id);
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

export {addEvent, deleteEvent, updateEvent, getEventIdsByDate, getEventIdsByType, loadEvent };