import React from 'react';
import { useOverlayContext } from '../../contexts/OverlayContext.jsx'
import { UpcomingTests } from './UpcomingTests.jsx';
import { UpcomingQuizes } from './UpcomingQuizes.jsx';
import { UpcomingProjects } from './UpcomingProjects.jsx';
import { AddEvent } from './AddEvent.jsx';

export function RightBar() {
    const { openOverlay } = useOverlayContext();

    const addEventFunction = () => {
        openOverlay(<AddEvent/>);
    }

    return (
        <>
            <UpcomingTests/>
            <UpcomingQuizes/>
            <UpcomingProjects/>
            <button className="bg-blue-500 text-white p-2 rounded" onClick={addEventFunction}>+</button>
        </>
    );
}