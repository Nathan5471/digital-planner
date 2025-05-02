import React from 'react';
import { loadEvent, deleteEvent } from '../utils/EventHandler.jsx';
import { useRefreshContext } from '../contexts/RefreshContext.jsx';
import { useOverlayContext } from '../contexts/OverlayContext.jsx';
import { EditPopup } from './EditPopup.jsx';
import deleteImage from '../assets/delete.svg';
import editImage from '../assets/edit.svg';



export function ShowEvent({ eventId}) {
    const event = loadEvent(eventId);
    const eventTitle = event.title;
    const eventType = event.type;
    const colors = {
        'Homework': 'bg-blue-100 text-blue-800',
        'Project': 'bg-green-100 text-green-800',
        'Quiz': 'bg-yellow-100 text-yellow-800',
        'Test': 'bg-red-100 text-red-800',
        'No School': 'bg-gray-100 text-gray-800'
    }
    const { triggerRefresh} = useRefreshContext();
    const { openOverlay } = useOverlayContext();

    const deleteSelf = () => {
        deleteEvent(eventId);
        triggerRefresh();
    }

    const editSelf = () => {
        console.log("Editing event with ID:", eventId);
        openOverlay(<EditPopup eventId={eventId} triggerRefresh={triggerRefresh}/>);
    }

    return (
        <div className="border p-3 rounded-lg shadow-md bg-white">
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold max-w-25">{eventTitle}</h4>
                
            </div>
            <div className={`border p-1 rounded-sm shadow-sm ${colors[eventType]}`}>
                <p className="text-xs">{eventType}</p>
            </div>
            <div className="flex p-1 justify-end">
                <button className="text-xs transform transition duration-200 ease-in-out hover:scale-105 hover:bg-gray-100 focus:outline-none" onClick={editSelf}>
                    <img src={editImage} width="20" height="20" alt="Edit Button"/>
                </button>
                <button className="text-xs transform transition duration-200 ease-in-out hover:scale-105 hover:bg-gray-100 focus:outline-none" onClick={deleteSelf}>
                    <img src={deleteImage} width="20" height="20" alt="Delete Button"/>
                </button>
            </div>
        </div>
    );
}