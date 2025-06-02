import React from 'react';
import { parseISO, format } from 'date-fns';

export function ShowEventSmall({ event }) {
    return (
            <div className="border dark:border-gray-600 p-2 rounded-lg shadow-md bg-white dark:bg-gray-600 mb-2">
                <h3 className="text-xs font-bold">{event.title}</h3>
                <p className="text-gray-400 text-xs">{format(parseISO(event.date), 'MMMM dd, yyyy')}</p>
            </div>
    )
}