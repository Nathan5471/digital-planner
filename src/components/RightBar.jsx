import React, { useState } from 'react';
import { addEvent } from '../utils/EventHandler';

export function RightBar({ triggerRefresh }) {
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventDate, setEventDate] = useState('');

    const updateEventTitle = (title) => {
        setEventTitle(title);
    }
    const updateEventDescription = (description) => {
        setEventDescription(description);
    }
    const updateEventType = (type) => {
        setEventType(type);
    }
    const updateEventDate = (date) => {
        setEventDate(date);
    }

    const addEventFunction = () => {
        addEvent(eventTitle, eventDescription, eventType, eventDate);
        setEventTitle('');
        setEventDescription('');
        setEventType('');
        setEventDate('');
        triggerRefresh();
    }
    return (
        <>
            <form className="bg-white p-4 rounded-lg shadow-md" onSubmit ={(e) => { e.preventDefault(); addEventFunction(); }}>
                <h2 className="text-lg font-bold mb-4">Add Event</h2>
                <input type="text" placeholder="Event Title" value={eventTitle} onChange={(e) => updateEventTitle(e.target.value)} className="border p-2 mb-2 w-full" required />
                <input type="text" placeholder="Event Description" value={eventDescription} onChange={(e) => updateEventDescription(e.target.value)} className="border p-2 mb-2 w-full" required />
                <select value={eventType} onChange={(e) => updateEventType(e.target.value)} className="border p-2 mb-2 w-full" required>
                    <option value="">Select Event Type</option>
                    <option value="Homework">Homework</option>
                    <option value="Project">Project</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Test">Test</option>
                    <option value="No School">No School</option>
                </select>
                <input type="date" placeholder="Event Date" value={eventDate} onChange={(e) => updateEventDate(e.target.value)} className="border p-2 mb-2 w-full" required />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Event</button>
            </form>
        </>
    )
}