import React from 'react';
import { useOverlayContext } from '../contexts/OverlayContext.jsx'
import { AddEvent } from './AddEvent.jsx';

export function RightBar() {
    const { openOverlay } = useOverlayContext();

    const addEventFunction = () => {
        openOverlay(<AddEvent/>);
    }

    return (
        <button className="bg-blue-500 text-white p-2 rounded" onClick={addEventFunction}>+</button>
    );
}