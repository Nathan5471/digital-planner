import React from 'react';
import { format } from 'date-fns';
import { useRefreshContext } from '../contexts/RefreshContext.jsx';
import { ShowEvent } from './ShowEvent.jsx';
import { getEventIdsByDate } from '../utils/EventHandler.jsx';

export function DayColumn({ date }) {
    const { refreshToggle } = useRefreshContext();
    const refresh = refreshToggle;
    const today = new Date();
    const isToday = format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
    const isPast = date < today;

    const events = getEventIdsByDate(format(date, 'yyyy-MM-dd'));;
    if (events.length > 4) {
        events.length = 4; // Limit to 4 events for display
    }
    
    return (
        <div className={`border p-4 rounded-lg shadow-md ${isToday ? "bg-blue-200" : "bg-white"}`}>
            <h3 className="text-xs font-bold items-center">{format(date, 'EEEE')} {format(date, 'MM/dd')}</h3>
            {events === null || events.length === 0 ? (
                <p className="text-gray-500">No events</p>
            ) : (
                events.map((event) => (
                <ShowEvent key={event} eventId={event} isToday={isToday} isPast={isPast}/>
                ))
            )}
        </div>
    )
}