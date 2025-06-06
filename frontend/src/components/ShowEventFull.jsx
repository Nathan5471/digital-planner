import React, { useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import { loadEvent } from '../utils/EventAPIHandler.js';
import { useOverlayContext } from '../contexts/OverlayContext.jsx';

export function ShowEventFull({ eventId }) {
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState(null);
    const colors = {
        'Homework': 'bg-blue-100 text-blue-800',
        'Project': 'bg-green-100 text-green-800',
        'Quiz': 'bg-yellow-100 text-yellow-800',
        'Test': 'bg-red-100 text-red-800',
        'No School': 'bg-gray-100 text-gray-800'
    }

    const { closeOverlay } = useOverlayContext();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await loadEvent(eventId);
                setEvent(eventData);
            } catch (error) {
                console.error("Error loading event:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchEvent();
    }, [eventId]);

    return (
        loading === true ? (
            <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">Loading...</p>
            </div>
        ) : (
            <div className="flex flex-col">
                <h4 className="text-2xl font-semibold mb-2">{event.title}</h4>
                <div className="flex justify-between items-center mb-2 text-sm">
                    <div className={`flex p-1 border rounded-sm ${colors[event.type]}`}>
                        <p>{event.type}</p>
                    </div>
                    <p>{format(parseISO(event.date), 'MMMM dd, yyyy')}</p>
                </div>
                <hr />
                <div className="text-lg">
                    <p className="font-bold">Description:</p>
                    <p>{event.description}</p>
                </div>   
                <button className="bg-blue-500 text-white p-2 rounded mt-4 transform transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-600 focus:outline-none" onClick={closeOverlay}>Close</button>
            </div>
        )
    );
}