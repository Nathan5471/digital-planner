import React, { useState } from 'react';
import { useOverlayContext } from '../contexts/OverlayContext.jsx'
import { AddEvent } from './AddEvent.jsx';

export function RightBar({ triggerRefresh }) {
    const { openOverlay } = useOverlayContext();

    const addEventFunction = () => {
        openOverlay(<AddEvent triggerRefresh={triggerRefresh} />);
    }

    return (
        <button className="bg-blue-500 text-white p-2 rounded" onClick={addEventFunction}>+</button>
    );
}