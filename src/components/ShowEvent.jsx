import React, { useState } from 'react';
import { loadEvent } from '../utils/EventHandler.jsx'

export function ShowEvent({ eventId }) {
    const event = loadEvent(eventId);
    const eventTitle = event.title;
    const eventType = event.type;

    return (
        <div className="border p-4 rounded-lg shadow-md bg-white">
            <h4 className="text-sm font-semibold">{eventTitle}</h4>
            <div className="border p-1 rounded-sm shadow-sm bg-gray-100">
                <p className="text-xs text-gray-500">{eventType}</p>
            </div>
        </div>
    );
}