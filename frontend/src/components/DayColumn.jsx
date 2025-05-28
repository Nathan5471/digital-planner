import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useRefreshContext } from '../contexts/RefreshContext.jsx';
import { useOverlayContext } from '../contexts/OverlayContext.jsx';
import { ShowEvent } from './ShowEvent.jsx';
import { DayEventPopup } from './DayEventPopup.jsx';
import { getEventIdsByDate } from '../utils/EventAPIHandler.js';

export function DayColumn({ date }) {
    const { refreshToggle } = useRefreshContext();
    const { openOverlay } = useOverlayContext();
    const refresh = refreshToggle;
    const today = new Date();
    const isToday = format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
    const isPast = format(date, "yyyy-MM-dd") < format(today, "yyyy-MM-dd");
    const [events, setEvents] = useState([]);
    const [eventCount, setEventCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventIds = await getEventIdsByDate(format(date, 'yyyy-MM-dd'));
                setEventCount(eventIds.length);
                if (eventIds.length > 3) {
                    eventIds.length = 3;
                }
                setEvents(eventIds);
            }
            catch (error) {
                console.error("Error fetching events:", error);
                return [];
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, [date, refresh]);
    
    const showMoreEvents = () => {
        openOverlay(<DayEventPopup date={date}/>)
    }
    return (
        loading === true ? (
            <div className="border p-4 rounded-lg shadow-md w-36 h-99 bg-gray-100">
                <p className="text-gray-500">Loading...</p>
            </div>
        ) : (
        <div className={`border p-4 rounded-lg shadow-md w-36 h-99 ${isToday ? "bg-blue-200" : "bg-white"}`}>
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
    )
}