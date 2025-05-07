import React from 'react';
import { format } from 'date-fns';
import { useRefreshContext } from '../contexts/RefreshContext.jsx';
import { useOverlayContext } from '../contexts/OverlayContext.jsx';
import { getEventIdsByDate } from '../utils/EventHandler.jsx';
import { ShowEventLong } from './ShowEventLong';

export function DayEventPopup({ date }) {
    const { triggerRefresh } = useRefreshContext();
    const { closeOverlay } = useOverlayContext();
    const refresh = triggerRefresh;

    const events = getEventIdsByDate(format(date, 'yyyy-MM-dd'));

    const handleClose = () => {
        closeOverlay();
    }
    
    if (events === null || events.length === 0) {
        return (
            <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{format(date, 'EEEE')} {format(date, 'MM/dd')}</h3>
                <p className="text-gray-500">No events</p>
            </div>
        )
    }

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold items-center mb-1">{format(date, 'EEEE')} {format(date, 'MM/dd')}</h3>
                <button className="bg-blue-500 text-white p-2 rounded transform transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-600 focus:outline-none" onClick={handleClose}>Close</button>
            </div>
            <div className="overflow-y-scroll max-h-96 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {events.map((event) => (
                    <ShowEventLong key={event} eventId={event}/>
                ))}
            </div>
        </>
    )
}