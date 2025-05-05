import React from 'react';
import { loadEvent } from '../utils/EventHandler.jsx';
import { useOverlayContext } from '../contexts/OverlayContext.jsx';

export function ShowEventFull({ eventId }) {
    const event = loadEvent(eventId);
    const eventTitle = event.title;
    const eventType = event.type;
    const eventDescription = event.description;
    const eventDate = event.date;
    const colors = {
        'Homework': 'bg-blue-100 text-blue-800',
        'Project': 'bg-green-100 text-green-800',
        'Quiz': 'bg-yellow-100 text-yellow-800',
        'Test': 'bg-red-100 text-red-800',
        'No School': 'bg-gray-100 text-gray-800'
    }

    const { closeOverlay } = useOverlayContext();

    return (
        <div className="flex flex-col">
            <h4 className="text-2xl font-semibold">{eventTitle}</h4>
            <hr />
            <div className="text-lg">
                <p className="font-bold">Description:</p>
                <p>{eventDescription}</p>
            </div>
            <div className={`p-1 border rounded-sm max-w-[calc(13%)] ${colors[eventType]}`}>
                <p className={"text-pretty"}>{eventType}</p>
            </div>
            <p className="text-pretty">{eventDate}</p>
            <button className="bg-red-500 text-white p-2 rounded mt-4" onClick={closeOverlay}>Close</button>
        </div>
    );
}