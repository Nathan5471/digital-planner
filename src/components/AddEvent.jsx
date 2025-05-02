import React, { useState } from 'react';
import { useRefreshContext } from '../contexts/RefreshContext.jsx';
import { useOverlayContext } from '../contexts/OverlayContext.jsx';
import { addEvent } from '../utils/EventHandler.jsx';

export function AddEvent() {
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventDate, setEventDate] = useState('');

    const { triggerRefresh } = useRefreshContext();
    const { closeOverlay } = useOverlayContext();

    const addEventFunction = () => {
        addEvent(eventTitle, eventDescription, eventType, eventDate);
        setEventTitle('');
        setEventDescription('');
        setEventType('');
        setEventDate('');
        triggerRefresh();
        closeOverlay();
    }
    return (
        <form onSubmit ={(e) => { e.preventDefault(); addEventFunction(); }}>
            <h2 className="text-lg font-bold mb-4">Add Event</h2>
            <input type="text" placeholder="Event Title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} className="border p-2 mb-2 w-full" required />
            <input type="text" placeholder="Event Description" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} className="border p-2 mb-2 w-full" required />
            <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="border p-2 mb-2 w-full" required>
                <option value="">Select Event Type</option>
                <option value="Homework">Homework</option>
                <option value="Project">Project</option>
                <option value="Quiz">Quiz</option>
                <option value="Test">Test</option>
                <option value="No School">No School</option>
            </select>
            <input type="date" placeholder="Event Date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="border p-2 mb-2 w-full" required />
            <div className="flex justify-between mb-2">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Event</button>
                <button type="button" className="bg-red-500 text-white p-2 rounded" onClick={closeOverlay}>Cancel</button>
            </div>
        </form>
    )
}