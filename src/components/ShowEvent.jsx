import React, { useState } from 'react';
import { loadEvent, deleteEvent } from '../utils/EventHandler.jsx'

export function ShowEvent({ eventId }) {
    const event = loadEvent(eventId);
    const eventTitle = event.title;
    const eventType = event.type;

    const deleteSelf = () => {
        deleteEvent(eventId);
        window.location.reload();
    }

    return (
        <div className="border p-4 rounded-lg shadow-md bg-white">
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold">{eventTitle}</h4>
                <button className="border text-xs text-red-500 hover:text-red-700" onClick={deleteSelf}>Delete</button>
            </div>
            
            <div className="border p-1 rounded-sm shadow-sm bg-gray-100">
                <p className="text-xs text-gray-500">{eventType}</p>
            </div>
        </div>
    );
}