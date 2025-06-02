import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { getEventsByType } from '../../utils/EventAPIHandler.js';
import { useRefreshContext } from '../../contexts/RefreshContext.jsx';
import { ShowEventSmall } from './ShowEventSmall.jsx';

export function UpcomingQuizes() {
    const { refreshToggle } = useRefreshContext();
    const [quizes, setQuizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const refresh = refreshToggle
    
    useEffect(() => {
        const fetchQuizes = async () => {
            try {
                const quizes = await getEventsByType('Quiz', format(new Date(), 'yyyy-MM-dd'));
                if (quizes.events.length > 3) {
                    quizes.events.length = 3;
                }
                setQuizes(quizes.events);
            } catch (error) {
                console.error("Error fetching quizes:", error);
                return [];
            } finally {
                setLoading(false);
            }
        }
        fetchQuizes();
    }, [refresh]);

    if (loading === true) {
        return (
            <div className="border dark:border-gray-700 p-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700 mt-2">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (quizes.length === 0) {
        return (
            <div className="border dark:border-gray-700 p-4 rounded-lg shadow-md bg-white dark:bg-gray-700 mt-2">
                <h3 className="text-pretty font-bold items-center">Upcoming Quizes</h3>
                <p className="text-gray-500">No upcoming quizes</p>
            </div>
        );
    }

    return (
        <div className="border dark:border-gray-700 p-4 rounded-lg shadow-md bg-white dark:bg-gray-700 mt-2">
            <h3 className="text-pretty font-bold items-center">Upcoming Quizes</h3>
            {quizes.map((event) => (
                <ShowEventSmall key={event._id} event={event} />
            ))}
        </div>
    )
}