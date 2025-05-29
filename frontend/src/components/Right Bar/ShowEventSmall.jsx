import React, { useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import { loadEvent } from '../../utils/EventAPIHandler.js';

export function ShowEventSmall({ eventId }) {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await loadEvent(eventId);
                setEvent(eventData);
            } catch (error) {
                console.error("Error fetching event:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchEvent();
    }, [eventId]);

    return (
        loading ? (
            <div className="border dark:border-gray-600 p-2 rounded-lg shadow-md bg-gray-100 dark:bg-gray-600 mb-2">
                <p className="text-gray-500">Loading...</p>
            </div>
        ) : (
            <div className="border dark:border-gray-600 p-2 rounded-lg shadow-md bg-white dark:bg-gray-600 mb-2">
                <h3 className="text-xs font-bold">{event.title}</h3>
                <p className="text-gray-400 text-xs">{format(parseISO(event.date), 'MMMM dd, yyyy')}</p>
            </div>
        )
    )
}