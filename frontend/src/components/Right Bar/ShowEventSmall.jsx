import React from 'react';
import { parseISO, format } from 'date-fns';
import { loadEvent } from '../../utils/EventHandler.jsx';

export function ShowEventSmall({ eventId }) {
    const event = loadEvent(eventId);

    return (
        <div className="border p-2 rounded-lg shadow-md bg-white mb-2">
            <h3 className="text-xs font-bold">{event.title}</h3>
            <p className="text-gray-400 text-xs">{format(parseISO(event.date), 'MMMM dd, yyyy')}</p>
        </div>
    )
}