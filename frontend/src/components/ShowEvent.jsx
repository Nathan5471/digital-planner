import React, { useState, useEffect } from 'react';
import { loadEvent, deleteEvent } from '../utils/EventAPIHandler.js';
import { useRefreshContext } from '../contexts/RefreshContext.jsx';
import { useOverlayContext } from '../contexts/OverlayContext.jsx';
import { EditPopup } from './EditPopup.jsx';
import { ShowEventFull } from './ShowEventFull.jsx';
import deleteImage from '../assets/delete.svg';
import editImage from '../assets/edit.svg';



export function ShowEvent({ eventId, isToday, isPast }) {
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState(null);
    const [eventTitle, setEventTitle] = useState('');
    const colors = {
        'Homework': 'bg-blue-100 text-blue-800',
        'Project': 'bg-green-100 text-green-800',
        'Quiz': 'bg-yellow-100 text-yellow-800',
        'Test': 'bg-red-100 text-red-800',
        'No School': 'bg-gray-100 text-gray-800'
    }
    const { triggerRefresh} = useRefreshContext();
    const { openOverlay } = useOverlayContext();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await loadEvent(eventId);
                setEvent(eventData);
                setEventTitle(eventData.title);
            } catch (error) {
                console.error("Error loading event:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchEvent();
    }, [eventId]);

    const deleteSelf = () => {
        deleteEvent(eventId);
        triggerRefresh();
    }

    const editSelf = () => {
        openOverlay(<EditPopup eventId={eventId} triggerRefresh={triggerRefresh}/>);
    }
    
    const showSelf = () => {
        openOverlay(<ShowEventFull eventId={eventId}/>);
    }
    return (
        loading === true ? (
            <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">Loading...</p>
            </div>
        ) : (
            <div className={`border p-3 rounded-lg shadow-md ${isToday ? "bg-blue-100" : "bg-white"} ${isPast ? "line-through" : ""} mt-2`}>
                <div className="flex justify-between items-center mb-2">

                    <h4 className="text-sm font-semibold max-w-25">{eventTitle}</h4>
                    
                </div>
                <div className={`border p-1 rounded-sm shadow-sm ${colors[event.type]}`}>
                    <p className="text-xs">{event.type}</p>
                </div>   
                <div className="flex p-1 justify-end">
                    <button className="text-xs border  rounded-sm shadow-sm transform transition duration-200 ease-in-out hover:scale-105 hover:bg-gray-100 focus:outline-none mr-2" onClick={showSelf}>
                        Details
                    </button>
                    <button className="text-xs transform transition duration-200 ease-in-out hover:scale-105 hover:bg-gray-100 focus:outline-none" onClick={editSelf}>
                        <img src={editImage} width="20" height="20" alt="Edit Button"/>
                    </button>
                    <button className="text-xs transform transition duration-200 ease-in-out hover:scale-105 hover:bg-gray-100 focus:outline-none" onClick={deleteSelf}>
                        <img src={deleteImage} width="20" height="20" alt="Delete Button"/>
                    </button>
                </div>
            </div>
        )
    );
}