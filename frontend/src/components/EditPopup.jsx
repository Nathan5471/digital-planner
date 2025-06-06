import React, { useState } from 'react';
import { loadEvent, updateEvent } from '../utils/EventAPIHandler.js';
import { useOverlayContext } from '../contexts/OverlayContext.jsx'

export function EditPopup({ eventId, triggerRefresh }) {
    const event = loadEvent(eventId);
    const [eventTitle, setEventTitle] = useState(event.title);
    const [eventDescription, setEventDescription] = useState(event.description);
    const [eventType, setEventType] = useState(event.type);
    const [eventDate, setEventDate] = useState(event.date);
    const { closeOverlay } = useOverlayContext();

    console.log(eventTitle, eventDescription, eventType, eventDate);
    console.log("Showing Edit Popup for event ID:", eventId);

    const handleUpdate = (e) => {
        e.preventDefault();
        const eventData = {
            id: eventId,
            title: eventTitle,
            description: eventDescription,
            type: eventType,
            date: eventDate
        }
        updateEvent(eventData);
        triggerRefresh();
        closeOverlay();
    }

    return (
        <>
            <h2 className="text-lg font-bold mb-4">Edit Event</h2>
            <form onSubmit={handleUpdate}>
                <input type="text" placeholder="Event Title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} className="border dark:border-gray-700 dark:bg-gray-700 p-2 mb-2 w-full" required />
                <input type="text" placeholder="Event Description" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} className="border dark:border-gray-700 dark:bg-gray-700 p-2 mb-2 w-full" required />
                <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="border dark:border-gray-700 dark:bg-gray-700 p-2 mb-2 w-full" required>
                    <option value="">Select Event Type</option>
                    <option value="Homework">Homework</option>
                    <option value="Project">Project</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Test">Test</option>
                    <option value="No School">No School</option>
                </select>
                <input type="date" placeholder="Event Date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="border dark:border-gray-700 dark:bg-gray-700 p-2 mb-2 w-full" required />
                <div className="flex justify-between mb-2">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded transform transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-600 focus:outline-none">Update Event</button>
                    <button type="button" className="bg-red-500 text-white p-2 rounded transform transition duration-200 ease-in-out hover:scale-105 hover:bg-red-600 focus:outline-none" onClick={closeOverlay}>Cancel</button>
                </div>
            </form>
        </>
    )
        
}