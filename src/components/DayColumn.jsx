import React from 'react';
import { format } from 'date-fns';
import { useRefreshContext } from '../contexts/RefreshContext.jsx';
import { useOverlayContext } from '../contexts/OverlayContext.jsx';
import { ShowEvent } from './ShowEvent.jsx';
import { DayEventPopup } from './DayEventPopup.jsx';
import { getEventIdsByDate } from '../utils/EventHandler.jsx';

export function DayColumn({ date }) {
    const { refreshToggle } = useRefreshContext();
    const { openOverlay } = useOverlayContext();
    const refresh = refreshToggle;
    const today = new Date();
    const isToday = format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
    const isPast = format(date, "yyyy-MM-dd") < format(today, "yyyy-MM-dd");

    const events = getEventIdsByDate(format(date, 'yyyy-MM-dd'));
    const eventCount = events.length;
    if (eventCount > 3) {
        events.length = 3; // Limit to 4 events for display
    }
    
    const showMoreEvents = () => {
        openOverlay(<DayEventPopup date={date}/>)
    }
    return (
        <div className={`border p-4 rounded-lg shadow-md w-36 h-97 ${isToday ? "bg-blue-200" : "bg-white"}`}>
            <h3 className="text-xs font-bold items-center mb-1">{format(date, 'EEEE')} {format(date, 'MM/dd')}</h3>
            {events === null || events.length === 0 ? (
                <p className="text-gray-500">No events</p>
            ) : (
                events.map((event) => (
                <ShowEvent key={event} eventId={event} isToday={isToday} isPast={isPast}/>
                ))
            )}
            {eventCount > 3 && (
                <button className="text-xs" onClick={showMoreEvents}>
                    Show {eventCount - 3} more events
                </button>
            )}
        </div>
    )
}