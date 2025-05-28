import React from 'react';
import { format } from 'date-fns';
import { getEventIdsByType } from '../../utils/EventAPIHandler.js';
import { useRefreshContext } from '../../contexts/RefreshContext.jsx';
import { ShowEventSmall } from './ShowEventSmall.jsx';

export function UpcomingQuizes() {
    const { refreshToggle } = useRefreshContext();
    const refresh = refreshToggle
    
    const tests = getEventIdsByType("Quiz", format(new Date(), 'yyyy-MM-dd'));
    if (tests.length > 4) {
        tests.length = 4;
    }

    if (tests.length === 0) {
        return (
            <div className="border p-4 rounded-lg shadow-md bg-white">
                <h3 className="text-pretty font-bold items-center">Upcoming Quizes</h3>
                <p className="text-gray-500">No upcoming quizes</p>
            </div>
        );
    }

    return (
        <div className="border p-4 rounded-lg shadow-md bg-white">
            <h3 className="text-pretty font-bold items-center">Upcoming Quizes</h3>
            {tests.map((event) => (
                <ShowEventSmall key={event} eventId={event} />
            ))}
        </div>
    )
}