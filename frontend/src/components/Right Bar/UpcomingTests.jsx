import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { getEventsByType } from '../../utils/EventAPIHandler.js';
import { useRefreshContext } from '../../contexts/RefreshContext.jsx';
import { ShowEventSmall } from './ShowEventSmall.jsx';

export function UpcomingTests() {
    const { refreshToggle } = useRefreshContext();
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);   
    const refresh = refreshToggle
    
    useEffect(() => {
        const fetchTests = async () => {
            try {
                const tests = await getEventsByType('Test', format(new Date(), 'yyyy-MM-dd'));
                if (tests.events.length > 3) {
                    tests.events.length = 3;
                }
                setTests(tests.events);
            } catch (error) {
                console.error("Error fetching tests:", error);
                return [];
            } finally {
                setLoading(false);
            }
        }
        fetchTests();
    }, [refresh]);

    if (loading === true) {
        return (
            <div className="border dark:border-gray-700 p-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (tests.length === 0) {
        return (
            <div className="border dark:border-gray-700 p-4 rounded-lg shadow-md bg-white dark:bg-gray-700">
                <h3 className="text-pretty font-bold items-center">Upcoming Tests</h3>
                <p className="text-gray-500">No upcoming tests</p>
            </div>
        );
    }

    return (
        <div className="border dark:border-gray-700 p-4 rounded-lg shadow-md bg-white dark:bg-gray-700">
            <h3 className="text-pretty font-bold items-center">Upcoming Tests</h3>
            {tests.map((event) => (
                <ShowEventSmall key={event._id} event={event} />
            ))}
        </div>
    )
}