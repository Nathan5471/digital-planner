import React from 'react';
import { useOverlayContext } from '../../contexts/OverlayContext.jsx'
import { UpcomingTests } from './UpcomingTests.jsx';
import { UpcomingQuizes } from './UpcomingQuizes.jsx';
import { UpcomingProjects } from './UpcomingProjects.jsx';
import { AddEvent } from '../AddEvent.jsx';

export function RightBar() {
    const { openOverlay } = useOverlayContext();

    const goToSettings = () => {
        window.location.href = '/settings';
    }

    const addEventFunction = () => {
        openOverlay(<AddEvent/>);
    }

    return (
        <div className="flex flex-col">
            <UpcomingTests/>
            <UpcomingQuizes/>
            <UpcomingProjects/>
            <button className="bg-blue-500 text-white p-2 rounded transform transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-600 focus:outline-none mt-2" onClick={goToSettings}>Settings</button>
            <button className="bg-blue-500 text-white p-2 rounded transform transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-600 focus:outline-none mt-2" onClick={addEventFunction}>Add Event</button>            
        </div>
    );
}